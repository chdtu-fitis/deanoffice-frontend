import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { defaultColumns } from './constants';
import { StudentDegree } from '../../models/StudentDegree';
import { GroupService } from '../../services/group.service';
import { StudentGroup } from '../../models/StudentGroup';
import {AcademicCertificateService} from "../../services/academic-certificate.service";

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
  loading: boolean;
  isSidebarOpen: boolean;

  constructor(
    private studentService: StudentService,
    private groupService: GroupService,
    private academicCertificateService: AcademicCertificateService
  ) { }

  ngOnInit() {
    this.getStudents();
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

  setColumns(columns: string[]) {
    if (!this.isAllDataLoaded) {
      this.loading = true;
      this.studentService.getStudents()
        .subscribe((students: StudentDegree[]) => {
          this.students = students;
          this.loading = false;
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
    this.selected = students;
  }

  getStudents() {
    this.loading = true;
    const stream = this.isAllDataLoaded
      ? this.studentService.getStudents()
      : this.studentService.getInitialStudents();
    stream.subscribe((students: StudentDegree[]) => {
      this.students = students;
      this.loading = false;
    });
  }

  onRemove(ids) {
    const idsToRemove = [].concat(ids);
    const filterFn = degree => !idsToRemove.includes(degree.id);
    this.selected = this.selected.filter(filterFn);
    this.students = this.students.filter(filterFn);
    this.setRows(this.students);
  }

  onFormAcademicCertificate() {
    if (this.selected[0])
      if (this.selected[0].student)
        this.academicCertificateService.buildAcademicCertificate(this.selected[0].student.id);
  }
}
