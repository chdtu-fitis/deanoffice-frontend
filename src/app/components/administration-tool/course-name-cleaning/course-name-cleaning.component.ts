import { Component, OnInit } from '@angular/core';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../../shared/constant';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AdministrationToolService} from '../../../services/administration-tool.service';
import {CourseName} from '../../../models/CourseName';
import {finalize} from 'rxjs/operators';
import {SelectionChangedEvent, ModelUpdatedEvent, GridReadyEvent} from 'ag-grid-community';
import {COLUMN_DEFINITIONS} from './column-definitions';

@Component({
  selector: 'course-name-cleaning',
  templateUrl: './course-name-cleaning.component.html',
  styleUrls: ['./course-name-cleaning.component.scss']
})
export class CourseNameCleaningComponent implements OnInit {

  defaultColDef = {
    ...DEFAULT_COLUMN_DEFINITIONS
  };
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  public courseNames$: BehaviorSubject<CourseName[]> = new BehaviorSubject<CourseName[]>([]);
  private grid = {
    api: null,
    columnApi: null,
  };
  private count: number;
  public selectedCourseNames: CourseName[] = [];
  public dataProcessing = false;

  getRowNodeId = (data) => data.id;

  constructor(private adminTool: AdministrationToolService) { }

  ngOnInit() {
    this.getUnusedCourseNames();
  }

  getUnusedCourseNames() {
    this.adminTool.getUnusedCourseNames()
      .subscribe(courseNames => this.courseNames$.next(courseNames));
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
    this.selectedCourseNames = event.api.getSelectedRows();
  }


  deleteUnusedCourseNames() {
    this.dataProcessing = true;
    this.adminTool.deleteUnusedCourseNames(this.selectedCourseNames.map(value => value.id))
      .pipe(
        finalize(() => this.dataProcessing = false),
      )
      .subscribe(() => {
        this.getUnusedCourseNames();
        this.selectedCourseNames = [];
      });
  }
}
