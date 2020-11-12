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
import {CopyDialogComponent} from './copy-dialog/copy-dialog.component';

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
  years = [{id: '2020', name: '2020-2021'}, {id: '2021', name: '2021-2022'}, {id: '2022', name: '2022-2023'}];
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
  selectedAssignedCourses = [];

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
    this.selectedCourses = [];
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
    this.loadCourses();
    this.assignedCoursesChild.studyYear = this.selectedYear;
    this.assignedCoursesChild.load();
  }

  onSelectedSemesterChange() {
    this.loadCourses();
    this.assignedCoursesChild.semester = this.selectedSemester;
    this.assignedCoursesChild.load();
  }

  onSelectedDegreeChange() {
    this.loadCourses();
    this.assignedCoursesChild.degreeId = this.selectedDegreeId;
    this.assignedCoursesChild.load();
  }

  changeSelectedCourses(selectedCourses) {
    this.selectedCourses = selectedCourses;
  }

  changeSelectedSelectiveCourses(selectedAssignedCourses) {
    this.selectedAssignedCourses = selectedAssignedCourses;
  }

  assignCourses() {
    const initialState = {
      studyYear: +this.selectedYear,
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

  deleteAssignedCourses() {
    for (const course of this.selectedAssignedCourses) {
      this.selectiveCourseService.deleteSelectiveCourse(course.id).subscribe(() => {
        this.assignedCoursesChild.load();
      }, error => {
        console.log(course, error);
      });
    }
  }

  copyCourses() {
    const initialState = {
      studyYear: +this.selectedYear,
      degreeId: this.selectedDegreeId,
      semester: this.selectedSemester,
    };

    const modalRef = this.modalService.show(CopyDialogComponent, {initialState, class: 'modal-custom'});
    modalRef.content.onCopy.subscribe(() => {
      this.assignedCoursesChild.load();
    });
  }
}
