import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../services/student.service';
import { academicVacationColumns } from '../constants';
import { StudentDegree } from '../../../models/StudentDegree';

@Component({
  selector: 'app-students-in-vacation',
  templateUrl: './students-in-vacation.component.html',
  styleUrls: [ './students-in-vacation.component.scss' ]
})
export class StudentsInVacationComponent implements OnInit {
  columns: string[] = academicVacationColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  loading: boolean;

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.studentService.getStudentsInAcademicVacation().subscribe((students: StudentDegree[]): void => {
      this.rows = students;
      this.loading = false;
    });
  }

  onSelect(students: StudentDegree[]): void {
    this.selected = students;
  }

  onRenew(id) {
    this.rows = this.rows.filter((row): boolean => row.id !== id);
  }
}
