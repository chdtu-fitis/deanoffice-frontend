import {Component, OnInit} from '@angular/core';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent} from '@ag-grid-community/all-modules'
import {COLUMN_DEFINITIONS_DEPARTMENT} from './columns-def-department';
import {Department} from '../../models/Department';
import {DepartmentService} from '../../services/department.service';
import {AgGridModules, commonAgGridModules} from '../shared/ag-grid';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  agGridModules: AgGridModules = commonAgGridModules;
  loadedDepartments: Department[] = [];
  departments: Department[] = [];
  selectedDepartments: Department[] = [];
  actualDepartments = true;
  searchText: string;

  count: number;
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS_DEPARTMENT;
  localeText = LOCALE_TEXT;
  gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(private departmentService: DepartmentService) {}


  onColumnResized() {
    this.gridApi.resetRowHeights();
  }

  ngOnInit() {
    this.loadDepartments();
  }

  filterActive() {
    this.departments = this.loadedDepartments.filter(department => {
      return this.actualDepartments && department.active;
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe(
      departments => this.loadedDepartments = departments, null, () => this.filterActive());
  }

  loadDepartmentsByActive(active: boolean) {
    this.departmentService.getDepartmentsByActive(active).subscribe(
      departments => this.departments = departments, null);
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
}
