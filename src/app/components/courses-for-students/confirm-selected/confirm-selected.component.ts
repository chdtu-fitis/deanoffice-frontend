import { Component, OnInit } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { CourseForStudentService } from "../../../services/course-for-student.service";
import { CourseForStudentWrite } from "./CourseForStudentWrite";
import { CourseType } from 'app/models/course-type.enum';

@Component({
  selector: 'confirm-selected',
  templateUrl: './confirm-selected.component.html',
  styleUrls: ['./confirm-selected.component.scss']
})
export class ConfirmSelectedComponent implements OnInit {
  selectedStudents;
  selectedCourses;
  courseType: CourseType;
  courseTypeEnum = CourseType;

  constructor(private courseForStudentService: CourseForStudentService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  save() {
    this.selectedStudents.forEach(student => {
      let coursesForStudent = [];
      this.selectedCourses.forEach(course => {
        const courseForStudentWrite = new CourseForStudentWrite(course.id, null, this.courseType);
        coursesForStudent.push(courseForStudentWrite);
      });
      this.courseForStudentService.createCoursesForStudent(student.id, coursesForStudent).subscribe(result => {
        console.log(result);
      });
    });
    this.bsModalRef.hide();
  }
}
