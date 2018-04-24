import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../services/student.service';
import { expelledStudentsColumns } from './../constants';
import { StudentDegree } from '../../../models/StudentDegree';

@Component({
  selector: 'app-expelled-students',
  templateUrl: './expelled-students.component.html',
  styleUrls: ['./expelled-students.component.scss'],
})
export class ExpelledStudentsComponent implements OnInit {
  columns: string[] = expelledStudentsColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.studentService.getExpelledStudents().subscribe((students: StudentDegree[]) => {
      this.rows = students;
    });
  }

  onSelect(students: StudentDegree[]) {
    this.selected = students;
  }
}
