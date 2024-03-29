import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCoursesStudentDegree} from '../../../models/SelectiveCoursesStudentDegree';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'edit-student-dialog',
  templateUrl: './edit-student-dialog.component.html',
  styleUrls: ['./edit-student-dialog.component.scss']
})
export class EditStudentDialogComponent implements OnInit {

  studyYear: string;
  selectiveCoursesStudentDegrees: SelectiveCoursesStudentDegree[] = [];
  isButtonClicked = false;

  form = new FormGroup({
    'surname': new FormControl('', [Validators.required]),
  })

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) {
  }

  ngOnInit() {
  }

  findStudentCourses(all: boolean): void {
    this.selectiveCoursesStudentDegrees = [];
    if (this.form.valid) {
      this.selectiveCourseService.getStudentCoursesBySurname(all, this.studyYear, this.f.surname.value)
        .subscribe(selectiveCoursesStudentDegree => {
          this.selectiveCoursesStudentDegrees = selectiveCoursesStudentDegree;
        })
    }
    this.isButtonClicked = true;
  }

  get f() {
    return this.form.controls;
  }
}
