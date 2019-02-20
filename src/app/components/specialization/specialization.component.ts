import {Component, OnInit} from '@angular/core';

import {SpecializationService} from '../../services/specialization.service';
import {Specialization} from '../../models/Specialization';
import {COLUMN_DEFINITIONS} from './column-definitions';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';


@Component({
  selector: 'specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent implements OnInit {
  specializations: Specialization[] = [];
  selectedSpecialization: Specialization[] = [];
  count;
  private actual: boolean;
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  private gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(private specializationService: SpecializationService) {}

  ngOnInit() {
    this.getSpecializations(true);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onModelUpdated(params) {
    this.count = params.api.getDisplayedRowCount();
  }


  getSpecializations(actual: boolean): void {
    this.actual = actual;
    this.specializationService.getSpecializations(actual).subscribe(
      (specializations: Specialization[]) => this.specializations = specializations,
    );
  }

  selectSpecializations(): void {
    this.selectedSpecialization = this.gridApi.getSelectedRows();
  }

  buttonIsDisabled(): boolean {
    return !this.selectedSpecialization.length || !this.actual;
  }

  deleteSpecialization() {
    this.gridApi.updateRowData({ remove: this.selectedSpecialization });
  }

  addSpecialization(specialization) {
    this.gridApi.updateRowData({ add: [specialization] });
  }

  updateSpecialization(specialization) {
    const rowNode = this.gridApi.getRowNode(this.selectedSpecialization[0].id);
    rowNode.setData(specialization)
  }

}
