import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {SelectiveCoursesYearParameters} from "../../../models/SelectiveCoursesYearParameters";
import {TypeCycle} from "../../../models/type-cycle.enum";
import {Degree} from "../../../models/degree.enum";

@Component({
  selector: 'disqualify-courses-dialog',
  templateUrl: './disqualify-courses-dialog.component.html',
  styleUrls: ['./disqualify-courses-dialog.component.scss']
})
export class DisqualifyCoursesDialogComponent implements OnInit {
  studyYear: number;
  degreeId: number;
  semester: number;
  yearParameters: SelectiveCoursesYearParameters[];

  selectiveCourses: SelectiveCourse[] = [];

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.selectiveCourseService.getSelectiveCoursesWithStudentsCount(this.studyYear, this.degreeId, this.semester)
      .subscribe((selectiveCourses: SelectiveCourse[]) => {
        this.selectiveCourses = selectiveCourses;
        this.selectiveCourses.sort((selectiveCourse1, selectiveCourse2) => {
          console.log(this.getMinStudentsCount(selectiveCourse1))
          if (selectiveCourse1.studentsCount < this.getMinStudentsCount(selectiveCourse1) && selectiveCourse2.studentsCount >= this.getMinStudentsCount(selectiveCourse2))
            return -1;
          if (selectiveCourse1.studentsCount >= this.getMinStudentsCount(selectiveCourse1) && selectiveCourse2.studentsCount < this.getMinStudentsCount(selectiveCourse2))
            return 1;
          // return selectiveCourse1.course.courseName.name.localeCompare(selectiveCourse2.course.courseName.name);
          if (selectiveCourse1.course.courseName.name < selectiveCourse2.course.courseName.name)
            return -1;
          else
            return 1;
        });
        this.selectiveCourses.forEach(selectiveCourse => selectiveCourse.selected = selectiveCourse.studentsCount < this.getMinStudentsCount(selectiveCourse));
      }, error => {
        console.log(error);
      })
  }

  getMinStudentsCount(selectiveCourse: SelectiveCourse): number {
    let GENERAL = Object.keys(TypeCycle).filter((x) => TypeCycle[x] == TypeCycle.GENERAL)[0];
    let PROFESSIONAL = Object.keys(TypeCycle).filter((x) => TypeCycle[x] == TypeCycle.PROFESSIONAL)[0];
    if (this.degreeId == Degree.BACHELOR && selectiveCourse.trainingCycle.toString() == GENERAL)
      return this.yearParameters[0].bachelorGeneralMinStudentsCount;

    if (this.degreeId == Degree.BACHELOR && selectiveCourse.trainingCycle.toString() == PROFESSIONAL)
      return this.yearParameters[0].bachelorProfessionalMinStudentsCount;

    if (this.degreeId == Degree.MASTER && selectiveCourse.trainingCycle.toString() == GENERAL)
      return this.yearParameters[0].masterGeneralMinStudentsCount;

    if (this.degreeId == Degree.MASTER && selectiveCourse.trainingCycle.toString() == PROFESSIONAL)
      return this.yearParameters[0].masterProfessionalMinStudentsCount;

    if (this.degreeId == Degree.PHD && selectiveCourse.trainingCycle.toString() == GENERAL)
      return this.yearParameters[0].phdGeneralMinStudentsCount;

    if (this.degreeId == Degree.PHD && selectiveCourse.trainingCycle.toString() == PROFESSIONAL)
      return this.yearParameters[0].phdProfessionalMinStudentsCount;

    return 0;
  }

  save(){
    let selectedCoursesIds = this.selectiveCourses
      .filter((selectiveCourse) => selectiveCourse.selected)
      .map((selectiveCourse) => selectiveCourse.id);
    this.selectiveCourseService.disqualifySelectiveCourses(selectedCoursesIds).subscribe(() => {
      this.bsModalRef.hide();
    });
  }
}
