import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { Student } from '../../models/Student';
import { defaultColumns } from './constants.js';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: Student[];
  columns: Object[] = [];
  isAllDataLoaded: boolean;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getInitialStudents()
      .subscribe(students => {
        this.students = students;
        this.setColumns(defaultColumns);
      })
  }

  setColumns(columns: string[]) {
    if (!this.isAllDataLoaded) {
      this.studentService.getStudents().subscribe(students => {
        this.students = JSON.parse(JSON.stringify(students));
        this.isAllDataLoaded = true;
      });
    }
    this.columns = JSON.parse(JSON.stringify(columns));
  }
}
