import { Component, OnInit } from '@angular/core';

import { StudentService } from '../../../services/student.service';
import {academicVacationColumnDefs, academicVacationColumns, defaultColDef, localeText} from '../constants';
import { StudentDegree } from '../../../models/StudentDegree';

@Component({
  selector: 'app-students-in-vacation',
  templateUrl: './students-in-vacation.component.html',
  styleUrls: ['./students-in-vacation.component.scss'],
})
export class StudentsInVacationComponent implements OnInit {
  columns: string[] = academicVacationColumns;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  loading: boolean;
  private gridApi;
  private gridColumnApi;
  columnDefs = academicVacationColumnDefs;
  defaultColDef = defaultColDef;
  localeText = localeText;
  count;
  getRowNodeId = (data) => data.id;

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit() {
    this.studentService.getStudentsInAcademicVacation().subscribe((students: StudentDegree[]) => {
      this.rows = students;
    });
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

  onSelect(index) {
    this.gridApi.ensureIndexVisible(index, 'top');
    const node = this.gridApi.getRowNode(this.rows[index].id);
    node.setSelected(true);
  }

  onRenew() {
    this.gridApi.updateRowData({ remove: this.selected });
  }
}
