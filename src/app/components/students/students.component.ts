import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { GroupService } from '../../services/group.service';
import { StudentDegree } from '../../models/StudentDegree';
import { StudentGroup } from '../../models/StudentGroup';
import {defaultColumnDefs, allColumnDefs, localeText} from './constants';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: StudentDegree[] = [];
  groups: StudentGroup[] = [];
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  isAllDataLoaded: boolean;
  loading: boolean;
  isSidebarOpen: boolean;

  count;
  oldSelectedIds = [];
  columnDefs = defaultColumnDefs;
  columnDefsAll = allColumnDefs;
  localeText = localeText;
  private gridApi;
  private gridColumnApi;
  getRowNodeId = function(data) {
    return data.id;
  };

  constructor(private studentService: StudentService, private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

  onSelectionChanged() {
    this.selected = this.gridApi.getSelectedRows();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
    this.studentService.getInitialStudents().subscribe((students: StudentDegree[]) => {
      this.students = students;
    });
  }

  onModelUpdated(params) {
    if (this.oldSelectedIds.length) {
      this.gridApi.forEachNode((node) => {
        for (const i of this.oldSelectedIds) {
          if (node.data.id === i) {
            node.setSelected(true);
          }
        }
      });
    }
    this.count = params.api.getDisplayedRowCount()
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
    for (const i of columns) {
      for (const j of this.columnDefsAll) {
        if (i === j['field']) {
          cols.push(j)
        }
      }
    }
    this.gridApi.setColumnDefs(cols);
  }

  prependStudent(student) {
    this.oldSelectedIds = this.selected.map(a => (a.id));
    this.oldSelectedIds.push(student.id);
    this.students = [student, ...this.students];
    this.setRows(this.students);
  };

  setRows(rows: StudentDegree[]) {
    this.rows = rows;
  };

  onSelect(students: StudentDegree[]) {
    this.selected = students;
  }

  updateStudentPersonalInfo(studentPersonalInfo) {
    const selectedStudent = this.students.find(student => student.id === this.selected[0].id);
    for (const col of this.columnDefsAll) {
      if (col.field.startsWith('student.')) {
        const [s, field] = col.field.split('.');
        selectedStudent['student'][field] = studentPersonalInfo[field];
      }
    }
    this.gridApi.refreshCells();
  }

  updateStudentDegreeInfo(degrees) {
    const activeDegree = degrees['degrees'][0];
    const selectedStudent = this.students.find(student => student.id === this.selected[0].id);
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

  onRemove(ids) {
    const idsToRemove = [].concat(ids);
    const filterFn = degree => !idsToRemove.includes(degree.id);
    this.oldSelectedIds = this.selected.map(a => (a.id));
    this.selected = this.selected.filter(filterFn);
    this.students = this.students.filter(filterFn);
    this.setRows(this.students);
  }
}
