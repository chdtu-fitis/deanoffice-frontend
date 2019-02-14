import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { StudentService } from '../../../services/student.service';
import {expelledColumnDefs, defaultColDef, expelledStudentsColumns, LOCALE_TEXT} from '../constants';
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
  private gridApi;
  private gridColumnApi;
  private gridApiAll;
  private gridColumnApiAll;
  columnDefs = expelledColumnDefs;
  defaultColDef = defaultColDef;
  localeText = LOCALE_TEXT;
  count;
  getRowNodeId = (data) => data.id;

  constructor(
    private studentService: StudentService,
    private academicCertificateService: AcademicCertificateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.studentService.getExpelledStudents().subscribe((students: StudentDegree[]) => {
      this.rows = students;
    });
    this.searchForm = this.fb.group({
      name: '',
      surname: '',
      startDate: ['', Validators.required],
      endDate: ''
    })
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged() {
    this.selected = this.gridApi.getSelectedRows();
  }

  onModelUpdated(params) {
    this.count = params.api.getDisplayedRowCount();
  }

  // TODO create reusable component
  onAllGridReady(params) {
    this.gridApiAll = params.api;
    this.gridColumnApiAll = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onAllSelectionChanged() {
    this.selectedAll = this.gridApiAll.getSelectedRows();
  }

  onRenew() {
    this.gridApi.updateRowData({ remove: this.selected });
  }

  onSelect(index) {
    this.gridApi.ensureIndexVisible(index, 'top');
    const node = this.gridApi.getRowNode(this.rows[index].id);
    node.setSelected(true, true);
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
    });
  }
}
