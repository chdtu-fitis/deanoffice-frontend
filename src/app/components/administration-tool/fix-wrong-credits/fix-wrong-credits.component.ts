import { Component, OnInit } from '@angular/core';
import {CreditService} from '../../../services/credit.service';
import {Course} from '../../../models/Course';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../../shared/constant';
import {COLUMN_DEFINITIONS} from './column-definitions';
import {GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent} from '@ag-grid-community/all-modules';
import {finalize} from 'rxjs/operators';
import {AgGridModules, commonAgGridModules} from '../../shared/ag-grid';

@Component({
  selector: 'fix-wrong-credits',
  templateUrl: './fix-wrong-credits.component.html',
  styleUrls: ['./fix-wrong-credits.component.scss']
})
export class FixWrongCreditsComponent implements OnInit {
  agGridModules: AgGridModules = commonAgGridModules;

  defaultColDef = {
    ...DEFAULT_COLUMN_DEFINITIONS
  };
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  public coursesWithWrongCredits$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private grid = {
    api: null,
    columnApi: null,
  };
  private count: number;
  public selectedCourses: Course[] = [];
  public dataProcessing = false;

  getRowNodeId = (data) => data.id;

  constructor(private courses: CreditService) { }

  ngOnInit() {
    this.getWrongCreditCourses();
  }

  getWrongCreditCourses() {
    this.courses.getCoursesWithWrongCredits()
      .subscribe(courses => this.coursesWithWrongCredits$.next(courses));
  }

  onGridReady(params: GridReadyEvent) {
    this.grid.api = params.api;
    this.grid.columnApi = params.columnApi;
    this.grid.api.sizeColumnsToFit();
  }

  onModelUpdated(params: ModelUpdatedEvent) {
    this.count = params.api.getDisplayedRowCount();
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectedCourses = event.api.getSelectedRows();
  }


  fixSelectedCoursesCredits() {
    this.dataProcessing = true;
    this.courses.fixCoursesWithWrongCredits(this.selectedCourses)
      .pipe(
        finalize(() => this.dataProcessing = false),
      )
      .subscribe(() => {
        this.getWrongCreditCourses();
      });
  }
}
