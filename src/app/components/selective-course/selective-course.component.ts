import {Component, OnInit} from '@angular/core';
import {SelectiveCourseService} from '../../services/selective-course.service';
import {SelectiveCourse} from '../../models/SelectiveCourse';
import {AgGridModules, commonAgGridModules} from '../shared/ag-grid';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {COLUMN_DEFINITIONS_SELECTIVE_COURSE} from './columns-def-selective-course';
import {GridReadyEvent} from '@ag-grid-community/all-modules';
import {Course} from '../../models/Course';
import {CourseService} from '../../services/course.service';
import {EditDialogComponent} from '../courses-for-groups/edit-dialog/edit-dialog.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AssignDialogComponent} from './assign-dialog/assign-dialog.component';

@Component({
  selector: 'selective-course',
  templateUrl: './selective-course.component.html',
  styleUrls: ['./selective-course.component.scss']
})

export class SelectiveCourseComponent implements OnInit {
  agGridModules: AgGridModules = commonAgGridModules;
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS_SELECTIVE_COURSE;
  localeText = LOCALE_TEXT;
  gridApi;
  gridColumnApi;
  getRowNodeId = (data) => data.id;
  selectedYear: string;
  years: string[] = ['2020', '2021', '2022'];
  selectedSemester: number = 1;
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedDegreeId: number = 1;
  degrees = [{id: 1, name: 'Бакалавр'}, {id: 3, name: 'Магістр'}];
  searchText: string;
  prepTypes = [{id: 1, name: 'Цикл загальної підготовки'}, {id: 2, name: 'Цикл професійної підготовки'}];
  knowledgeTypes: string[] = ['dssd', 'dssdsddsds 2'];

  courses: Course[];
  studiedCoursesLoading = false;

  selectedCourses = [];
  coursesSelectedForDelete = [];

  selectiveCourses: SelectiveCourse[];

  constructor(private selectiveCourseService: SelectiveCourseService,
              private courseService: CourseService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.selectedYear = new Date().getFullYear().toString();
    this.loadCoursesBySemester();
    this.selectiveCourseService.getSelectiveCourses(this.selectedYear).subscribe((selectiveCourses: SelectiveCourse[]) => {
      this.selectiveCourses = selectiveCourses;
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged(event) {

  }

  onModelUpdated($event) {

  }

  onSelectedYearChange() {

  }

  onSelectedSemesterChange() {

  }

  onSelectedDegreeChange() {

  }

  changeSelectedCourses(selectedCourses) {
    this.selectedCourses = selectedCourses;
  }

  assignCourses() {
    /*const initialState = {
      courseFromTable: course,
      selectedGroup: this.selectedGroup
    };*/
    this.modalService.show(AssignDialogComponent, {});
  }

  loadCoursesBySemester() {
    this.studiedCoursesLoading = true;
    this.courseService.getCoursesBySemesterAndHoursPerCredit(this.selectedSemester, 30).subscribe(cfg => {
      this.courses = cfg;
      this.studiedCoursesLoading = false;
    });
  }

  addCoursesToSelected() {

  }

  deleteAddedCourses() {

  }

  copyCourses() {

  }


}
