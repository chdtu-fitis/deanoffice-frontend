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
  students: any[];
  columns: any[] = defaultColumns;
  isAllDataLoaded: boolean;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getInitialStudents()
      .subscribe((students: any[]) => {
        this.students = students;
      })
  }

  setColumns(columns: string[]) {
    if (!this.isAllDataLoaded) {
      this.studentService.getStudents()
        .subscribe((students: any[]) => {
          this.students = students;
          this.isAllDataLoaded = true;
        });
    }
    this.columns = columns;
  }
}
