import {Component, OnInit} from '@angular/core';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent} from 'ag-grid-community'
import {NotificationsService} from 'angular2-notifications';
import {COLUMN_DEFINITIONS_DEPARTMENT} from './columns-def-department';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/department.service';
import {StudentGroup} from '../../models/StudentGroup';
import {Teacher} from '../../models/Teacher';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  loadedDepartments: Department[] = [];
  departments: Department[] = [];
  selectedDepartments: Department[] = [];
  actualDepartments = true;
  searchText: string;
  alertOptions = {
    showProgressBar: false,
    timeOut: 50000,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10,
    maxStack: 3
  };

  count: number;
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS_DEPARTMENT;
  localeText = LOCALE_TEXT;
  gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(private departmentService: DepartmentService,
              private notificationsService: NotificationsService) {
  }


  onColumnResized() {
    this.gridApi.resetRowHeights();
  }

  ngOnInit() {
    this.loadDepartments();
  }

  filterActive() {
    console.log(this.loadedDepartments);
    this.departments = this.loadedDepartments.filter(department => {
      return this.actualDepartments && department.active;
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments()
      .subscribe(departments => this.loadedDepartments = departments, null, () => this.filterActive());
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
    this.selectedDepartments = event.api.getSelectedRows();
  }

  onAddDepartment(department: Department) {
    this.loadedDepartments.push(department);
    this.gridApi.updateRowData({add: [department], addIndex: 0});
  }

  onUpdateDepartment(updatedDepartment: Department) {
    const rowNode = this.gridApi.getRowNode(this.selectedDepartments[0].id);
    rowNode.setData(updatedDepartment);
    this.selectedDepartments = [];
    this.selectedDepartments.push(updatedDepartment);
    const index = this.loadedDepartments.findIndex(loadedDepartment => loadedDepartment.id === updatedDepartment.id);
    this.loadedDepartments[index] = updatedDepartment;
  }

  onDeleteDepartment(deletedDepartment: Department) {
    this.gridApi.updateRowData({remove: this.selectedDepartments});
    const department = this.loadedDepartments.find(department => department.id === deletedDepartment.id);
    department.active = false;
  }

  showErrorAlert(event) {
    this.notificationsService.error('Помилка',
      event.message,
      this.alertOptions);
  }
}
