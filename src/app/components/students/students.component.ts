import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { GroupService } from '../../services/group.service';
import { StudentDegree } from '../../models/StudentDegree';
import { StudentGroup } from '../../models/StudentGroup';
import {defaultColDef, defaultColumnDefs, allColumnDefs, LOCALE_TEXT} from './constants';
import {GroupFilterComponent} from './group-filter/group-filter.component';
import {PaymentFilterComponent} from './payment-filter/payment-filter.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {StudentsColumnsComponent} from './students-columns/students-columns.component';
import {CurrentUserService} from '../../services/auth/current-user.service';
import {AcademicCertificateService} from "../../services/academic-certificate.service";
import {AgGridModules, commonAgGridModules} from '../shared/ag-grid';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  agGridModules: AgGridModules = commonAgGridModules;
  students: StudentDegree[] = [];
  groups: StudentGroup[] = [];
  selected: StudentDegree[] = [];
  isAllDataLoaded: boolean;
  userFacultyId: number;

  count;
  oldSelectedIds = [];
  columnDefs = defaultColumnDefs;
  selectedColumns = [...defaultColumnDefs];
  columnDefsAll = allColumnDefs;
  defaultColDef = defaultColDef;
  localeText = LOCALE_TEXT;
  private gridApi;
  private gridColumnApi;
  frameworkComponents;
  abstractOfScholasticRecordsLoading = false;
  getRowNodeId = (data) => data.id;

  constructor(private studentService: StudentService,
              private groupService: GroupService,
              private modalService: BsModalService,
              private currentUserService: CurrentUserService,
              private academicCertificateService: AcademicCertificateService) {
    this.userFacultyId = currentUserService.facultyId();
    this.frameworkComponents = {
      groupFilter: GroupFilterComponent,
      paymentFilter: PaymentFilterComponent
    };
  }

  columnsModal() {
    const initialState = {selectedColumns: this.selectedColumns};
    const bsModalRef = this.modalService.show(StudentsColumnsComponent, {initialState});
    bsModalRef.content.setColumns.subscribe((selectedColumns) => {
      this.oldSelectedIds = this.selected.map(studentDegree => (studentDegree.id));
      if (!this.isAllDataLoaded) {
        this.studentService.getStudents()
          .subscribe((students: StudentDegree[]) => {
            this.students = students;
            this.isAllDataLoaded = true;
          });
      }
      this.selectedColumns = selectedColumns;
      this.gridApi.setColumnDefs(selectedColumns);
    })
  }

  ngOnInit() {
    this.studentService.getInitialStudents().subscribe((students: StudentDegree[]) => {
      this.students = students;
    });
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

  onSelectionChanged() {
    this.selected = this.gridApi.getSelectedRows();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onModelUpdated(params) {
    this.count = params.api.getDisplayedRowCount();
    if (this.oldSelectedIds.length) {
      for (const selectedId of this.oldSelectedIds) {
        const rowNode = this.gridApi.getRowNode(selectedId);
        if (rowNode) {
          rowNode.setSelected(true);
        }
      }
    }
  }

  onSearch(student?: StudentDegree) {
    if (student) {
      this.gridApi.ensureNodeVisible(node => node.id === student.id);
      const studentNode = this.gridApi.getRowNode(student.id);
      studentNode.setSelected(true, true);
    }
  }

  updateStudentPersonalInfo(studentPersonalInfo) {
    const selectedStudent = this.students.find(student => student.id === this.selected[0].id);
    for (const col of this.columnDefsAll) {
      if (col.field.startsWith('student.')) {
        const [, field] = col.field.split('.');
        selectedStudent['student'][field] = studentPersonalInfo[field];
      }
    }
    this.gridApi.refreshCells();
  }

  updateStudentDegreeInfo(degrees) {
    const activeDegree = degrees['degrees'][0];
    const selectedStudent = this.students.find(student => student.id === this.selected[0].id);
    if (activeDegree['studentGroup']) {
      selectedStudent['studentGroup'] = activeDegree['studentGroup'];
    }
    for (const col of this.columnDefsAll) {
      if (col.field.startsWith('student')) {
        continue
      }
      selectedStudent[col.field] = activeDegree[col.field];
    }
    this.gridApi.refreshCells();
  }

  updateStudentsGroup(group) {
    for (const node of this.selected) {
      const rowNode = this.gridApi.getRowNode(node.id);
      rowNode.setDataValue('studentGroup.name', group.name);
    }
  }

  updateRecordBookNumber(recordBookNumber) {
    for (const id of Object.keys(recordBookNumber)) {
      const rowNode = this.gridApi.getRowNode(id);
      rowNode.setDataValue('recordBookNumber', recordBookNumber[id]);
    }
  }

  prependStudent(student) {
    this.oldSelectedIds = this.selected.map(a => (a.id));
    this.oldSelectedIds.push(student.id);
    this.gridApi.updateRowData({ add: [student], addIndex: 0});
  };

  onRemove(ids) {
    const idsToRemove = [].concat(ids);
    this.selected = this.selected.filter(degree => idsToRemove.includes(degree.id));
    this.oldSelectedIds = this.selected.map(a => (a.id));
    this.oldSelectedIds = this.oldSelectedIds.filter(id => !idsToRemove.includes(id));
    this.gridApi.updateRowData({ remove: this.selected });
  }

  onTransfer(transferData) {
    if (this.userFacultyId === transferData.specialization.facultyId) {
      const rowNode = this.gridApi.getRowNode(this.selected[0].id);
      rowNode.setDataValue('payment', transferData.newPayment);
      rowNode.setDataValue('studentGroup.name', transferData.group.name);
      rowNode.setDataValue('specialization.speciality.code', transferData.specialization.speciality.code);
  } else {
      this.gridApi.updateRowData({ remove: this.selected });
    }
  }

  onAbstractOfScholasticRecords(studentDegreeId: number) {
    this.abstractOfScholasticRecordsLoading = true;
    this.academicCertificateService.buildAbstractOfScholasticRecords(studentDegreeId).subscribe(() => {
      this.abstractOfScholasticRecordsLoading = false;
    });
  }
}
