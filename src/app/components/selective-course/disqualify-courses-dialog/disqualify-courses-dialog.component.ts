import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCourse} from '../../../models/SelectiveCourse';

@Component({
  selector: 'disqualify-courses-dialog',
  templateUrl: './disqualify-courses-dialog.component.html',
  styleUrls: ['./disqualify-courses-dialog.component.scss']
})
export class DisqualifyCoursesDialogComponent implements OnInit {

  studyYear: string;
  degreeId: number;
  semester: number;

  selectiveCourses: SelectiveCourse[] = [];
  selectedSelectiveCourses: SelectiveCourse[] = [];

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.selectiveCourseService.getSelectiveCourses(this.studyYear, this.degreeId, this.semester)
      .subscribe((selectiveCourses: SelectiveCourse[]) => {
        this.selectiveCourses = selectiveCourses;
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

}
