import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/Course';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {COLUMN_DEFINITIONS} from './column-set';
import {CoursePagination} from '../../models/course/CoursePagination';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  isActual = true;
  selected: Course[] = [];
  courses: Course[] = [];
  rows: Course[] = [];
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  private gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(private courseServise: CourseService) { }

  ngOnInit() {
    this.getCoursesForAdministrator();
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  getCoursesForAdministrator() {
    this.courseServise.getCoursesForAdministrator()
      .subscribe((coursePaginationDTO: CoursePagination) => {
        this.rows = coursePaginationDTO.items;
      });
  }
}
