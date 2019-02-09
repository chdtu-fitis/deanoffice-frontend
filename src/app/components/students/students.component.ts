import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { GroupService } from '../../services/group.service';
import { StudentDegree } from '../../models/StudentDegree';
import { StudentGroup } from '../../models/StudentGroup';
import {defaultColDef, defaultColumnDefs, allColumnDefs, localeText} from './constants';
import {GroupFilterComponent} from './group-filter/group-filter.component';
import {PaymentFilterComponent} from './payment-filter/payment-filter.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: StudentDegree[] = [];
  groups: StudentGroup[] = [];
  selected: StudentDegree[] = [];
  isAllDataLoaded: boolean;
  count;
  oldSelectedIds = [];
  columnDefs = defaultColumnDefs;
  columnDefsAll = allColumnDefs;
  defaultColDef = defaultColDef;
  localeText = localeText;
  private gridApi;
  private gridColumnApi;
  frameworkComponents;
  getRowNodeId = (data) => data.id;

  constructor(private studentService: StudentService, private groupService: GroupService) {
    this.frameworkComponents = {
      groupFilter: GroupFilterComponent,
      paymentFilter: PaymentFilterComponent
    };
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

  setColumns(columns: string[]) {
    this.oldSelectedIds = this.selected.map(a => (a.id));
    if (!this.isAllDataLoaded) {
      this.studentService.getStudents()
        .subscribe((students: StudentDegree[]) => {
          this.students = students;
          this.isAllDataLoaded = true;
        });
    }
    const cols = [];
    for (const column of columns) {
      for (const columnDef of this.columnDefsAll) {
        if (column === columnDef.field) {
          cols.push(columnDef)
        }
      }
    }
    this.gridApi.setColumnDefs(cols);
  }

  onSelect(students: StudentDegree[]) {
    this.selected = students;
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
    this.gridApi.updateRowData({ add: [student] });
  };


  onRemove(ids) {
    const idsToRemove = [].concat(ids);
    this.selected = this.selected.filter(degree => idsToRemove.includes(degree.id));
    this.oldSelectedIds = this.selected.map(a => (a.id));
    this.oldSelectedIds = this.oldSelectedIds.filter(id => !idsToRemove.includes(id));
    this.gridApi.updateRowData({ remove: this.selected });
  }
}
