import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {Specialization} from '../../models/Specialization';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent} from 'ag-grid-community'
import {GroupService} from '../../services/group.service';
import {NotificationsService} from 'angular2-notifications';
import {SpecializationService} from '../../services/specialization.service';
import {COLUMN_DEFINITIONS_DEPARTMENT} from './columns-def-department';
import {Department} from '../../models/Department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departments: Department[] = [];
  selectedDepartments: Department[] = [];
  actualGroups = true;
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
  private gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(private notificationsService: NotificationsService) {
  }


  onColumnResized() {
    this.gridApi.resetRowHeights();
  }

  ngOnInit() {
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

  showErrorAlert(event) {
    this.notificationsService.error('Помилка',
      event.message,
      this.alertOptions);
  }
}
