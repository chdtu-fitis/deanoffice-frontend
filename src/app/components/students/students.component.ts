import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { Student } from '../../models/Student';
import { headerValues } from './translations';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[];
  columns = [];
  defaultColumns = ['id', 'surname', 'name'];

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents()
      .subscribe(students => {
        this.students = students;
        this.createColumns();
      })
  }

  createColumns() {
    this.columns = this.defaultColumns.map(prop => ({
      prop,
      name: headerValues[prop],
    }))
  }

}
