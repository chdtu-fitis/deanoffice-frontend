import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common'

import {StudentService} from '../../../services/student.service';
import {defaultColDef, expelledColumnDefs, LOCALE_TEXT} from '../constants';
import {StudentDegree} from '../../../models/StudentDegree';
import {AcademicCertificateService} from '../../../services/academic-certificate.service';
import {StudentAllInfoComponent} from '../student-all-info/student-all-info.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';

@Component({
  selector: 'app-expelled-students',
  templateUrl: './expelled-students.component.html',
  styleUrls: ['./expelled-students.component.scss'],
})
export class ExpelledStudentsComponent implements OnInit {
  rows: StudentDegree[] = [];
  rowsAll: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  selectedAll: StudentDegree[] = [];
  loading: boolean;
  academicCertificateLoading: boolean;
  searchForm: FormGroup;
  // TODO: create reusable component
  private gridApi;
  private gridColumnApi;
  private gridApiAll;
  private gridColumnApiAll;
  columnDefs = expelledColumnDefs;
  defaultColDef = defaultColDef;
  localeText = LOCALE_TEXT;
  count;
  @ViewChild('studentAllInfo') studentAllInfo: StudentAllInfoComponent;
  getRowNodeId = (data) => data.id;

  constructor(
    private studentService: StudentService,
    private academicCertificateService: AcademicCertificateService,
    private fb: FormBuilder,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.studentService.getExpelledStudents().subscribe((students: StudentDegree[]) => {
      this.rows = students;
    });
    this.searchForm = this.fb.group({
      name: '',
      surname: '',
      startDate: [this.getStartDate(), Validators.required],
      endDate: ''
    });
  }

  getStartDate() {
    const date = new Date();
    date.setFullYear( date.getFullYear() - 7 );
    return new DatePipe('en-US').transform(date, 'y-MM-dd')
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

  onRenewAll() {
    this.gridApiAll.updateRowData({ remove: this.selectedAll });
  }

  onSelect(index) {
    this.gridApi.ensureIndexVisible(index, 'top');
    const node = this.gridApi.getRowNode(this.rows[index].id);
    node.setSelected(true, true);
  }

  onFormAcademicCertificate() {
    if (this.selected[0]) {
      this.academicCertificateLoading = true;
      this.academicCertificateService.buildAcademicCertificate(this.selected[0].id).subscribe(() => {
          this.academicCertificateLoading = false;
        }
      );
    }
  }

  onAllTabSelect() {
    this.groupService.getGroups(false).subscribe((groups: StudentGroup[]) => {
      this.studentAllInfo.groups = groups;
    });
  }

  onSearchAllExpelled() {
    this.studentService.searchExpelled(this.searchForm.value).subscribe((students: StudentDegree[]) => {
      this.rowsAll = students;
    });
  }
}
