import {Component, OnInit} from '@angular/core';

import {SpecializationService} from '../../services/specialization.service';
import {Specialization} from '../../models/Specialization';
import {COLUMN_DEFINITIONS} from './column-definitions';
import {LOCALE_TEXT} from '../shared/constant';


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

  deleteSpecialization() {
    this.gridApi.updateRowData({ remove: this.selectedSpecialization });
  }

  addSpecialization(obj) {
    const {specialization, degrees, specialities, specializationId} = obj;
    specialization['id'] = specializationId;
    const speciality = specialities.find(obj => obj.id === specialization['specialityId']);
    specialization['speciality'] = {'name':  speciality.name, 'code': speciality.code};
    const degree = degrees.find(obj => obj.id === specialization['degreeId']);
    specialization['degree'] = {'name': degree.name};
    this.gridApi.updateRowData({ add: [specialization] });
  }

  updateSpecialization(obj) {
    const rowNode = this.gridApi.getRowNode(this.selectedSpecialization[0].id);
    const {specialization, degrees, specialities} = obj;
    const speciality = specialities.find(speciality => speciality.id === specialization['specialityId']);
    specialization['speciality'] = {'name':  speciality.name, 'code': speciality.code};
    const degree = degrees.find(degree => degree.id === specialization['degreeId']);
    specialization['degree'] = {'name': degree.name};
    rowNode.setData(specialization)
  }

}
