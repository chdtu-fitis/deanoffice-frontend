import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../services/student.service';
import { academicVacationColumns } from '../constants';
import { StudentDegree } from '../../../models/StudentDegree';
import { StudentGroup } from '../../../models/StudentGroup';

@Component({
  selector: 'app-students-in-vacation',
  templateUrl: './students-in-vacation.component.html',
  styleUrls: ['./students-in-vacation.component.scss'],
})
export class StudentsInVacationComponent implements OnInit {
  students: StudentDegree[] = [];
  groups: StudentGroup[] = [];
  columns: string[] = academicVacationColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.studentService.getStudentsInAcademicVacation().subscribe((students: StudentDegree[]) => {
      this.students = students;
      this.rows = students;
    });
  }

  onSelect(students: StudentDegree[]) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...students);
  }

  toggleSelect(student: StudentDegree) {
    const index = this.selected.findIndex(entry => entry.id === student.id);
    if (index > -1) {
      this.selected.splice(index, 1);
    } else {
      this.onSelect([...this.selected, student]);
    }
  }
}
