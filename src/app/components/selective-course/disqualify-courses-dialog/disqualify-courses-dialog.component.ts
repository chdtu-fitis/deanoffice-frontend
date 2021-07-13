import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {SelectiveCoursesYearParameters} from "../../../models/SelectiveCoursesYearParameters";
import {TypeCycle} from "../../../models/TypeCycle";
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
  selectedSelectiveCourses: SelectiveCourse[] = [];

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.selectiveCourseService.getSelectiveCoursesWithStudentsCount(this.studyYear, this.degreeId, this.semester)
      .subscribe((selectiveCourses: SelectiveCourse[]) => {
        this.selectiveCourses = selectiveCourses;
        this.selectiveCourses.forEach(selectiveCourse => selectiveCourse.selected = selectiveCourse.studentsCount < this.getMinStudentsCount(selectiveCourse));
      }, error => {
        console.log(error);
      })
    console.log(this.selectiveCourses);
  }

  changeSelectedSelectiveCourses(selectedSelectiveCourses: SelectiveCourse[]) {
    this.selectedSelectiveCourses = selectedSelectiveCourses;
    console.log(selectedSelectiveCourses);
  }

  submit() {

  }

  getMinStudentsCount(selectiveCourse: SelectiveCourse): number {
    if (this.degreeId == Degree.BACHELOR && selectiveCourse.trainingCycle == TypeCycle.GENERAL)
      return this.yearParameters[0].bachelorGeneralMinStudentsCount;

    if (this.degreeId == Degree.BACHELOR && selectiveCourse.trainingCycle == TypeCycle.PROFESSIONAL)
      return this.yearParameters[0].bachelorProfessionalMinStudentsCount;

    if (this.degreeId == Degree.MASTER && selectiveCourse.trainingCycle == TypeCycle.GENERAL)
      return this.yearParameters[0].masterGeneralMinStudentsCount;

    if (this.degreeId == Degree.MASTER && selectiveCourse.trainingCycle == TypeCycle.PROFESSIONAL)
      return this.yearParameters[0].masterProfessionalMinStudentsCount;

    if (this.degreeId == Degree.PHD && selectiveCourse.trainingCycle == TypeCycle.GENERAL)
      return this.yearParameters[0].phdGeneralMinStudentsCount;

    if (this.degreeId == Degree.PHD && selectiveCourse.trainingCycle == TypeCycle.PROFESSIONAL)
      return this.yearParameters[0].phdProfessionalMinStudentsCount;

    return 0;
  }
}
