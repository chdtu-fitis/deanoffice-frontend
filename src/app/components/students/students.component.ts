import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { defaultColumns } from './constants.js';
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
  columns: any[] = defaultColumns;
  isAllDataLoaded: boolean;
  groups: StudentGroup[];

  constructor(
    private studentService: StudentService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.studentService.getInitialStudents()
      .subscribe((students: StudentDegree[]) => {
        this.students = students;
      });
    this.groupService.getGroups()
      .subscribe((groups: StudentGroup[]) => {
        this.groups = groups;
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
