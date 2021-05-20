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
import {StudiedCoursesComponent} from '../shared/studied-courses/studied-courses.component';
import {Utils} from '../shared/utils';
import {YearParametersDialogComponent} from './year-parameters-dialog/year-parameters-dialog.component';
import {YearParametersTableComponent} from './year-parameters-table/year-parameters-table.component';
import {SelectiveCoursesYearParameters} from '../../models/SelectiveCoursesYearParameters';
import {AlertsService} from '../shared/alerts/alerts.service';

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
  years = [
    {id: '2020', name: '2020-2021'},
    {id: '2021', name: '2021-2022'},
    {id: '2022', name: '2022-2023'}];
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

  yearParameters: SelectiveCoursesYearParameters;

  @ViewChild(StudiedCoursesComponent, {static: true}) studiedCoursesChild: StudiedCoursesComponent;
  @ViewChild(AssignedCoursesComponent, {static: true}) assignedCoursesChild: AssignedCoursesComponent;

  constructor(private selectiveCourseService: SelectiveCourseService,
              private courseService: CourseService,
              private modalService: BsModalService,
              private alerts: AlertsService) {
  }

  ngOnInit(): void {
    this.selectedYear = Utils.getCurrentAcademicYear().toString();
    this.loadCourses();
    this.loadYearParameters();
  }

  loadCourses() {
    this.studiedCoursesChild.clearSelection();
    this.studiedCoursesLoading = true;

    this.courseService.getCoursesBySemesterAndHoursPerCredit(this.selectedSemester, 30).subscribe(cfg => {
      this.courses = cfg;
      this.studiedCoursesLoading = false;
    });
  }

  loadYearParameters() {
    this.selectiveCourseService.getYearParameters(this.selectedYear)
      .subscribe(yearParameters => {
        this.yearParameters = yearParameters;
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

    this.loadYearParameters();
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
      this.studiedCoursesChild.clearSelection();
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


  addYearParameters() {
    const modalRef = this.modalService.show(YearParametersDialogComponent, { class: 'modal-custom'});

    modalRef.content.onSubmit.subscribe(() => {
      this.loadYearParameters();
    });
  }

  disqualifySelectiveCourses() {
    this.selectiveCourseService.disqualifySelectiveCourses(this.selectedSemester, this.selectedDegreeId).subscribe(() => {
      this.alerts.showSuccess({body: 'Дисципліни з недостатньою кількістю студентів були дискваліфіковані', timeout: 5000});
      this.assignedCoursesChild.load();
    }, error => {
      console.log(error);
      this.alerts.showError({body: 'Помилка, зверніться до адміністратора', timeout: 5000});
    });
  }
}
