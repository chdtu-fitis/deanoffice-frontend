import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { defaultColumns } from './constants.js';
import { StudentDegree } from '../../models/StudentDegree';
import { GroupService } from '../../services/group.service';
import { StudentGroup } from '../../models/StudentGroup';
import {Student} from "../../models/Student";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: StudentDegree[] = [];
  groups: StudentGroup[] = [];
  columns: any[] = defaultColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  isAllDataLoaded: boolean;

  constructor(
    private studentService: StudentService,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.getStudents();
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

  setColumns(columns: string[]) {
    if (!this.isAllDataLoaded) {
      this.studentService.getStudents()
        .subscribe((students: StudentDegree[]) => {
          this.students = students;
          this.rows = students;
          this.isAllDataLoaded = true;
        });
    }
    this.columns = columns;
  }

  prependStudent(student) {
    this.students = [student, ...this.students];
  };

  setRows(rows: StudentDegree[]) {
    this.rows = rows;
  }

  onSelect(students: StudentDegree[]) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...students);
  }

  getStudents() {
    const stream = this.isAllDataLoaded
      ? this.studentService.getStudents()
      : this.studentService.getInitialStudents();
    stream.subscribe((students: StudentDegree[]) => {
      this.students = students;
      this.rows = students;
    });
  }
}
