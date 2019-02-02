import { Component } from '@angular/core';

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
export class StudentsComponent {
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

  constructor(private studentService: StudentService, private groupService: GroupService) {
  }

  onSelectionChanged() {
    this.selected = this.gridApi.getSelectedRows();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    this.gridColumnApi = params.columnApi;
    this.getStudents();
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
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

  // TODO: use form data instead of loading all student
  getStudents() {
    const stream = this.isAllDataLoaded
      ? this.studentService.getStudents()
      : this.studentService.getInitialStudents();
    stream.subscribe((students: StudentDegree[]) => {
      this.oldSelectedIds = this.selected.map(a => (a.id));
      this.students = students;
      console.log(this.students);
    });
  }

  updateStudentPersonalInfo(student) {
    const rowNode = this.gridApi.getRowNode(this.gridApi.getSelectedNodes()[0].id);
    for (const prop of  Object.keys(this.selected[0].student)) {
      rowNode.setDataValue(`student.${prop}`, student[prop]);
    }
  }

  updateStudentsGroup(group) {
    for (const node of this.gridApi.getSelectedNodes()) {
      const rowNode = this.gridApi.getRowNode(node.id);
      rowNode.setDataValue('studentGroup.name', group.name);
    }
  }

  onRemove(ids) {
    const idsToRemove = [].concat(ids);
    const filterFn = degree => !idsToRemove.includes(degree.id);
    this.oldSelectedIds = this.selected.map(a => (a.id));
    this.students = this.students.filter(filterFn);
    this.setRows(this.students);
  }
}
