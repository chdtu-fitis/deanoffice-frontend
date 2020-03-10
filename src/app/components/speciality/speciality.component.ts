import {Component, OnInit} from '@angular/core';
import {SpecialityService} from '../../services/speciality.service';
import {Speciality} from '../../models/Speciality';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {COLUMN_DEFINITIONS} from './column-definitions';
import {commonAgGridModules, AgGridModules} from '../shared/ag-grid';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  agGridModules: AgGridModules = commonAgGridModules;
  buttonText = 'Показати неактуальні';
  isActual = true;
  selected: Speciality[] = [];
  specialities: Speciality[] = [];
  rows: Speciality[] = [];
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  private gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;


  constructor(private specialityService: SpecialityService) {}

  ngOnInit() {
    this.getSpecialities();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  getSpecialities() {
    this.specialityService.getSpecialities()
      .subscribe((speciality: Speciality[]) => {
        this.specialities = speciality;
        this.rows = speciality.filter(value => value.active === this.isActual);
      });
  }

  actual() {
    this.isActual = !this.isActual;
    this.buttonText = this.isActual ? 'Показати неактуальні' : 'Показати актуальні';
    this.rows = this.specialities.filter(value => value.active === this.isActual);
  }
}
