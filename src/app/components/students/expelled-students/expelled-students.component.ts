import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import { StudentService } from '../../../services/student.service';
import { expelledStudentsColumns } from '../constants';
import { StudentDegree } from '../../../models/StudentDegree';
import {AcademicCertificateService} from '../../../services/academic-certificate.service';

@Component({
  selector: 'app-expelled-students',
  templateUrl: './expelled-students.component.html',
  styleUrls: ['./expelled-students.component.scss'],
})
export class ExpelledStudentsComponent implements OnInit {
  columns: string[] = expelledStudentsColumns;
  rows: StudentDegree[] = [];
  rowsAll: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  selectedAll: StudentDegree[] = [];
  loading: boolean;
  academicCertificateLoading: boolean;
  searchForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private academicCertificateService: AcademicCertificateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = true;
    this.studentService.getExpelledStudents().subscribe((students: StudentDegree[]) => {
      this.rows = students;
      this.loading = false;
    });
    this.searchForm = this.fb.group({
      name: '',
      surname: '',
      startDate: '',
      endDate: ''
    })
  }

  onSelect(students: StudentDegree[]) {
    this.selected = students;
  }

  onSelectAll(students: StudentDegree[]) {
    this.selectedAll = students;
  }

  onRenew(id) {
    this.rows = this.rows.filter(row => row.id !== id);
  }

  onFormAcademicCertificate() {
    if (this.selected[0]) {
      this.academicCertificateLoading = true;
      this.academicCertificateService.buildAcademicCertificate(this.selected[0].id).subscribe(a => {
          this.academicCertificateLoading = false;
        }
      );
    }
  }

  onSearchAllExpelled() {
    this.studentService.searchExpelled(this.searchForm.value).subscribe((students: StudentDegree[]) => {
      this.rowsAll = students;
      this.loading = false;
    });
  }
}
