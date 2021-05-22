import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCoursesStudentDegree} from '../../../models/SelectiveCoursesStudentDegree';

@Component({
  selector: 'edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {

  studyYear: string;
  selectiveCoursesStudentDegree: SelectiveCoursesStudentDegree[] = [];
  surname = '';
  isButtonClicked = false;

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
  }

  findStudentCourses(all: boolean): void {
    this.selectiveCoursesStudentDegree = [];
    this.selectiveCourseService.getStudentCoursesBySurname(true, this.studyYear, this.surname)
      .subscribe(selectiveCoursesStudentDegree => {
        this.selectiveCoursesStudentDegree = selectiveCoursesStudentDegree;
      })
    this.isButtonClicked = true;
  }
}
