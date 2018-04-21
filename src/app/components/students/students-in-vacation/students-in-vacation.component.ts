import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../services/student.service';
import { academicVacationColumns } from '../constants';
import { StudentDegree } from '../../../models/StudentDegree';

@Component({
  selector: 'app-students-in-vacation',
  templateUrl: './students-in-vacation.component.html',
  styleUrls: ['./students-in-vacation.component.scss'],
})
export class StudentsInVacationComponent implements OnInit {
  columns: string[] = academicVacationColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.studentService.getStudentsInAcademicVacation().subscribe((students: StudentDegree[]) => {
      this.rows = students;
    });
  }

  onSelect(students: StudentDegree[]) {
    this.selected = students;
  }
}
