import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/Course';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {COLUMN_DEFINITIONS} from './column-set';
import {CoursePagination} from '../../models/course/CoursePagination';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  selected: Course[] = [];
  courses: Course[] = [];
  rows: Course[] = [];
  comboBoxChoise = [];
  semesters = [];
  hoursPerCreditList = [];
  knowledgeControlList = [];
  items = [];

  courseName: string;
  nameStartingWith: string;
  nameContains: string;
  hours: number;
  hoursPerCredit: number;
  knowledgeControl: string;
  currentSemester: number;
  total: number;
  currentPage: number;
  totalPages: number;
  filter: boolean;

  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;

  searchForm: FormGroup;

  private gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(private courseServise: CourseService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.currentPage = 1;
    // this.items = [1, 2];
    this.getFilteredCoursesForAdministrator(this.currentPage, '', null, null, '', '', '', null);
    this.comboBoxChoise = ['Повна назва предмета', 'Назва починаєтья з', 'Назва містить в собі'];
    this.semesters = ['', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.hoursPerCreditList = ['', 30, 36];
    this.filter = true;
    this.knowledgeControlList = ['', 'іспит', 'залік', 'курсова робота', 'курсовий проект',
      'диференційований залік', 'державний іспит', 'атестація', 'практика',
      'практика (як залік)'];

    this.searchForm = this.fb.group({
      cmbValue: '',
      name: '',
      hours: '',
      hoursPerCredit: '',
      semester: '',
      knowledgeControl: ''
    });
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
        this.totalPages = coursePagination.totalPages;
        this.total = this.rows.length;
      });
  }

  onViewFilteredCourses(page: number) {
    if (page === null || page === undefined) {
      page = 1;
    }
    // this.items = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
    this.courseName = '';
    this.nameContains = '';
    this.nameStartingWith = '';
    switch (this.searchForm.value.cmbValue) {
      case 'Повна назва предмета': {
        this.courseName = this.searchForm.value.name;
        break;
      }
      case 'Назва починаєтья з': {
        this.nameStartingWith = this.searchForm.value.name;
        break;
      }
      case 'Назва містить в собі': {
        this.nameContains = this.searchForm.value.name;
        // this.nameContains = this.searchForm.value.name;
        break;
      }
    }
    this.hours = this.searchForm.value.hours;
    this.hoursPerCredit = this.searchForm.value.hoursPerCredit;
    this.knowledgeControl = this.searchForm.value.knowledgeControl;
    this.currentSemester = this.searchForm.value.semester;
    this.getFilteredCoursesForAdministrator(page, this.courseName, this.hours, this.hoursPerCredit,
      this.knowledgeControl, this.nameStartingWith, this.nameContains, this.currentSemester);
  }

  getFilteredCoursesForAdministrator(page: number, courseName: string, hours: number,
                                     hoursPerCredit: number, knowledgeControl: string,
                                     nameStartingWith: string, nameContains: string, semester: number) {
    this.courseServise.getFilteredCoursesForAdministrator(page, courseName, hours, hoursPerCredit,
      knowledgeControl, nameStartingWith, nameContains, semester).subscribe((coursePagination: CoursePagination) => {
      this.rows = coursePagination.items;
      this.currentPage = coursePagination.currentPage;
      this.totalPages = coursePagination.totalPages;
      this.total = this.rows.length;
      this.items = [];
      for (let i = 1; i <= this.totalPages; i++) {
        this.items.push(i);
      }
    });
    // this.items = [];
    // for (let i = 1; i <= this.totalPages; i++) {
    //   this.items.push(i);
    // }
  }
}
