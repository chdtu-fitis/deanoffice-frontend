import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../services/student.service';
import { expelledStudentsColumns } from '../constants';
import { StudentDegree } from '../../../models/StudentDegree';
import { AcademicCertificateService } from '../../../services/academic-certificate.service';

@Component({
  selector: 'app-expelled-students',
  templateUrl: './expelled-students.component.html',
  styleUrls: [ './expelled-students.component.scss' ]
})
export class ExpelledStudentsComponent implements OnInit {
  columns: string[] = expelledStudentsColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  loading: boolean;
  academicCertificateLoading: boolean;

  constructor(
    private studentService: StudentService,
    private academicCertificateService: AcademicCertificateService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.studentService.getExpelledStudents().subscribe((students: StudentDegree[]) => {
      this.rows = students;
      this.loading = false;
    });
  }

  onSelect(students: StudentDegree[]): void {
    this.selected = students;
  }

  onRenew(id): void {
    this.rows = this.rows.filter((row): boolean => row.id !== id);
  }

  onFormAcademicCertificate(): void {
    if (this.selected[0]) {
      this.academicCertificateLoading = true;
      this.academicCertificateService
        .buildAcademicCertificate(this.selected[0].id)
        .subscribe((): boolean => this.academicCertificateLoading = false);
    }
  }
}
