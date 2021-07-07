import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {SelectiveCoursesYearParameters} from "../../../models/SelectiveCoursesYearParameters";
import {TypeCycle} from "../../../models/TypeCycle";

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

    if (this.degreeId == 1 && selectiveCourse.trainingCycle == TypeCycle.GENERAL) return this.yearParameters[0].bachelorGeneralMinStudentsCount
  }
}
