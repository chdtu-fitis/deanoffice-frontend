import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../services/student.service';
import { expelledStudentsColumns } from './../constants';
import { StudentDegree } from '../../../models/StudentDegree';
import { GroupService } from '../../../services/group.service';
import { StudentGroup } from '../../../models/StudentGroup';

@Component({
  selector: 'app-expelled-students',
  templateUrl: './expelled-students.component.html',
  styleUrls: ['./expelled-students.component.scss'],
})
export class ExpelledStudentsComponent implements OnInit {
  students: StudentDegree[] = [];
  groups: StudentGroup[] = [];
  columns: string[] = expelledStudentsColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];

  constructor(
    private studentService: StudentService,
    private groupService: GroupService,
  ) { }

  ngOnInit() {
    this.getExpelledStudents();
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

  setRows(rows: StudentDegree[]) {
    this.rows = rows;
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

  getExpelledStudents() {
    this.studentService.getExpelledStudents().subscribe((students: StudentDegree[]) => {
      this.students = students;
      this.rows = students;
    });
  }
}
