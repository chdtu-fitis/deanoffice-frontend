import {Component, OnInit, ViewChild} from '@angular/core';
import {GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent} from '@ag-grid-community/all-modules'

import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {COLUMN_DEFINITIONS} from './columns-def';
import {Teacher} from '../../models/Teacher';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  @ViewChild('table') table;
  selectedTeachers: Teacher[] = [];
  private active: boolean;
  loadedTeachers: Teacher[] = [];
  teachers: Teacher[] = [];
  searchText: string;
  alertOptions = {
    showProgressBar: false,
    timeOut: 50000,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10,
    maxStack: 3
  };

  count;
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(
    private teacherService: TeacherService) {
  }

  onColumnResized() {
    this.gridApi.resetRowHeights();
  }

  ngOnInit() {
    this.loadTeachers(true);
  }

  loadTeachers(active: boolean): void {
    this.teacherService.getTeachers(active).subscribe(
      (teachers: Teacher[]) => this.teachers = teachers,
    );
  }

   onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onModelUpdated(params: ModelUpdatedEvent) {
    this.count = params.api.getDisplayedRowCount();
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectedTeachers = event.api.getSelectedRows();
  }

  onRemoveTeacher() {
      this.gridApi.updateRowData({ remove: this.selectedTeachers});
  }

  onAddTeacher(teacher) {
    this.gridApi.updateRowData({ add: [teacher], addIndex: 0 });
  }

  onUpdateTeacher(updatedTeacher: Teacher) {
    const rowNode = this.gridApi.getRowNode(this.selectedTeachers[0].id);
    rowNode.setData(updatedTeacher);
    this.selectedTeachers = [];
    this.selectedTeachers.push(updatedTeacher);
    const index = this.loadedTeachers.findIndex(loadedTeacher => loadedTeacher.id === updatedTeacher.id);
    this.loadedTeachers[index] = updatedTeacher;
  }
}
