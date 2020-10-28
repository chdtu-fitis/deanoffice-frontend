import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectiveCourseService} from '../../services/selective-course.service';
import {AgGridModules, commonAgGridModules} from '../shared/ag-grid';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';
import {COLUMN_DEFINITIONS_SELECTIVE_COURSE} from './columns-def-selective-course';
import {GridReadyEvent} from '@ag-grid-community/all-modules';
import {Course} from '../../models/Course';
import {CourseService} from '../../services/course.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AssignDialogComponent} from './assign-dialog/assign-dialog.component';
import {AssignedCoursesComponent} from './assigned-courses/assigned-courses.component';

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
  selectedYear: string;
  years: string[] = ['2020', '2021', '2022'];
  selectedSemester: number = 1;
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedDegreeId: number = 1;
  degrees = [{id: 1, name: 'Бакалавр'}, {id: 3, name: 'Магістр'}];
  searchText: string;
  prepTypes = [
    {id: 1, name: 'Цикл загальної підготовки'},
    {id: 2, name: 'Цикл професійної підготовки'}];

  selectedPrepType = this.prepTypes[0];

  courses: Course[];
  studiedCoursesLoading = false;

  selectedCourses = [];
  coursesSelectedForDelete = [];

  @ViewChild(AssignedCoursesComponent, {static: true}) assignedCoursesChild: AssignedCoursesComponent;

  constructor(private selectiveCourseService: SelectiveCourseService,
              private courseService: CourseService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.selectedYear = new Date().getFullYear().toString();
    this.loadCourses();
  }

  loadCourses() {
    this.studiedCoursesLoading = true;
    this.courseService.getCoursesBySemesterAndHoursPerCredit(this.selectedSemester, 30).subscribe(cfg => {
      this.courses = cfg;
      this.studiedCoursesLoading = false;
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
    this.loadCourses();
  }

  onSelectedDegreeChange() {

  }

  changeSelectedCourses(selectedCourses) {
    this.selectedCourses = selectedCourses;
  }

  assignCourses() {
    const initialState = {
      studyYear: parseInt(this.selectedYear, 10),
      degreeId: this.selectedDegreeId,
      prepType: this.selectedPrepType,
      courses: this.selectedCourses,
      semester: this.selectedSemester,
    };

    const modalRef = this.modalService.show(AssignDialogComponent, {initialState, class: 'modal-custom'});
    modalRef.content.onAssign.subscribe(() => {
      this.assignedCoursesChild.load();
    });
  }

  addCoursesToSelected() {

  }

  deleteAddedCourses() {

  }

  copyCourses() {

  }


}
