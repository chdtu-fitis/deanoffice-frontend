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
  selected: Course[] = [];
  courses: Course[] = [];
  rows: Course[] = [];
  total: number;
  collection = [];
  currentPage: number;
  totalPages: number;
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  private gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(private courseServise: CourseService) { }

  ngOnInit() {
    this.currentPage = 1;
    this.getCoursesForAdministrator(this.currentPage);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  getCoursesForAdministrator(page: number) {
    this.courseServise.getCoursesForAdministrator(page)
      .subscribe((coursePagination: CoursePagination) => {
        this.rows = coursePagination.items;
        this.currentPage = coursePagination.currentPage;
        this.totalPages = coursePagination.totalPage;
        this.total = this.rows.length;
      });
  }
}
