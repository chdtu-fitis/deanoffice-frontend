import {Component, Input, OnInit, Output} from '@angular/core';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {StudentDegree} from '../../../models/StudentDegree';
import {SelectiveCourseStudentDegrees} from '../../../models/SelectiveCourseStudentDegrees';
import {SelectiveCourse} from '../../../models/SelectiveCourse';

@Component({
  selector: 'registered-students',
  templateUrl: './registered-students.component.html',
  styleUrls: ['./registered-students.component.scss']
})
export class RegisteredStudentsComponent implements OnInit {
  @Input() selectiveCourseId: number;

  selectiveCourse: SelectiveCourse;
  studentDegrees: StudentDegree[] = [];

  constructor(private selectiveCourseService: SelectiveCourseService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.selectiveCourseService.getSelectiveCourseStudents(this.selectiveCourseId).subscribe(
      (response: SelectiveCourseStudentDegrees) => {
        this.selectiveCourse = response.selectiveCourse ? response.selectiveCourse : null;
        this.studentDegrees = response.studentDegrees ? response.studentDegrees : [];
      });
  }

  clear() {
    this.selectiveCourse = null;
    this.studentDegrees = [];
  }
}
