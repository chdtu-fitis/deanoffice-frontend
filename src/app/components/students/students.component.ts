import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { defaultColumns } from './constants.js';
import { StudentDegree } from '../../models/StudentDegree';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: StudentDegree[] = [];
  columns: any[] = defaultColumns;
  isAllDataLoaded: boolean;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getInitialStudents()
      .subscribe((students: StudentDegree[]) => {
        this.students = students;
      })
  }

  setColumns(columns: string[]) {
    if (!this.isAllDataLoaded) {
      this.studentService.getStudents()
        .subscribe((students: StudentDegree[]) => {
          this.students = students;
          this.isAllDataLoaded = true;
        });
    }
    this.columns = columns;
  }
}
