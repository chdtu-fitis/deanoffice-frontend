import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { defaultColumns } from './constants';
import { StudentDegree } from '../../models/StudentDegree';
import { GroupService } from '../../services/group.service';
import { StudentGroup } from '../../models/StudentGroup';

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
    this.setRows(this.students);
    this.onSelect([student]);
  };

  setRows(rows: StudentDegree[]) {
    this.rows = rows;
  };

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

  getStudents() {
    const stream = this.isAllDataLoaded
      ? this.studentService.getStudents()
      : this.studentService.getInitialStudents();
    stream.subscribe((students: StudentDegree[]) => {
      this.students = students;
      this.rows = students;
    });
  }

  onRemove(ids) {
    const idsToRemove = [].concat(ids);
    const filterFn = degree => !idsToRemove.includes(degree.id);
    this.selected = this.selected.filter(filterFn);
    this.students = this.students.filter(filterFn);
    this.setRows(this.students);
  }
}
