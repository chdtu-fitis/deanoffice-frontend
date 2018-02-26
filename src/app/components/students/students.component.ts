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
  columns: Array<Object> = [];
  defaultColumns: Set<string> = new Set(['id', 'name', 'surname']);

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents()
      .subscribe(students => {
        this.students = students;
        this.setColumns(Array.from(this.defaultColumns.keys()));
      })
  }

  setColumns(columns: Array<string>) {
    this.columns = this.transformArrayToColumns(columns);
  }

  private transformArrayToColumns(array: Array<string>): Array<Object> {
    return array.map(prop => ({
      prop,
      name: headerValues[prop],
    }));
  }
}
