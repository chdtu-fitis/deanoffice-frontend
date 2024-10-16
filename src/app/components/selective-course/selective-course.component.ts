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
import {StudiedCoursesComponent} from '../shared/courses-for/studied-courses/studied-courses.component';
import {Utils} from '../shared/utils';
import {YearParametersDialogComponent} from './year-parameters-dialog/year-parameters-dialog.component';
import {SelectiveCoursesYearParameters} from '../../models/SelectiveCoursesYearParameters';
import {EditStudentDialogComponent} from './edit-student-dialog/edit-student-dialog.component';
import {DisqualifyCoursesDialogComponent} from './disqualify-courses-dialog/disqualify-courses-dialog.component';
import {AddCoursesForStudentsComponent} from './add-courses-for-students/add-courses-for-students.component';
import {ImportCsvComponent} from "./import-csv/import-csv.component";
import {SelectiveCoursesStatisticsComponent} from './selective-courses-statistics/selective-courses-statistics.component';
import {TableFilterNameAndTrainingCycleService} from '../../services/table-filter-name-and-training-cycle';
import {CoursesByGroupComponent} from './courses-by-group/courses-by-group.component';
import {Degree} from '../../models/Degree';
import {GroupNamesGenerationComponent} from './group-names-generation/group-names-generation.component';
import {AlertsService} from "../shared/alerts/alerts.service";

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
    {id: '2022', name: '2022-2023'},
    {id: '2023', name: '2023-2024'},
    {id: '2024', name: '2024-2025'},
  ];
  selectedSemester: number = 1;
  semesters: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedDegreeId: number = 1;
  degrees = [{id: 1, name: 'Бакалавр'}, {id: 3, name: 'Магістр'}, {id: 4, name: 'Доктор філософії'},];
  searchText: string;
  prepTypes = [
    {id: 1, name: 'Цикл загальної підготовки'},
    {id: 2, name: 'Цикл професійної підготовки'}];
  selectedPrepType = this.prepTypes[0];

  courses: Course[];
  studiedCoursesLoading = false;

  selectedCourses = [];
  selectedAssignedCourses = [];

  yearParameters: SelectiveCoursesYearParameters[] = [];
  isChecked = false;

  ASSIGN: string = "assign";
  FILTER: string = "filter";
  assignOrFilter: string = this.ASSIGN;
  nameFilter: string = "";
  trainingCycle = [{type: 'ALL', name: "Всі"}, {type: 'GENERAL', name: "Загальна"}, {type: 'PROFESSIONAL', name: "Професійна"}];
  trainingCycleFilter = this.trainingCycle[0];


  @ViewChild(StudiedCoursesComponent, {static: true}) studiedCoursesChild: StudiedCoursesComponent;
  @ViewChild(AssignedCoursesComponent, {static: true}) assignedCoursesChild: AssignedCoursesComponent;

  constructor(private selectiveCourseService: SelectiveCourseService,
              private courseService: CourseService,
              private modalService: BsModalService,
              private alerts: AlertsService,
              private tableFilterOfNameAndTrainingCycleService: TableFilterNameAndTrainingCycleService) {
  }

  ngOnInit(): void {
    this.selectedYear = new Date().getFullYear().toString();
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
    this.selectiveCourseService.getYearParameters(String(+this.selectedYear - 1))
      .subscribe(yearParameters => {
        this.yearParameters = yearParameters;
        this.assignedCoursesChild.isWithYearParameters = Boolean(yearParameters.length);
        this.assignedCoursesChild.load();
      });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onSelectionChanged(event) {  }

  onModelUpdated($event) {

  }

  onSelectedYearChange() {
    this.loadCourses();
    this.assignedCoursesChild.studyYear = this.selectedYear;
    // this.assignedCoursesChild.load();

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
    const modalRef = this.modalService.show(YearParametersDialogComponent, {class: 'modal-custom'});

    modalRef.content.onSubmit.subscribe(() => {
      this.loadYearParameters();
      this.loadCourses();
    });
  }

  disqualifySelectiveCourses() {
    const initialState = {
      studyYear: this.selectedYear,
      degreeId: this.selectedDegreeId,
      semester: this.selectedSemester,
      yearParameters: this.yearParameters[0]
    };
    const modalRef = this.modalService.show(DisqualifyCoursesDialogComponent, {
      animated: true, keyboard: true, backdrop: true, ignoreBackdropClick: true, initialState, class: 'modal-custom'
    });
    // this.selectiveCourseService.disqualifySelectiveCourses(this.selectedSemester, this.selectedDegreeId).subscribe(() => {
    //   this.alerts.showSuccess({body: 'Дисципліни з недостатньою кількістю студентів були дискваліфіковані', timeout: 5000});
    //   this.assignedCoursesChild.load();
    // }, error => {
    //   console.log(error);
    //   this.alerts.showError({body: 'Помилка, зверніться до адміністратора', timeout: 5000});
    // });
  }

  assignOrFilterHandler() {
    this.assignOrFilter === this.ASSIGN ? this.assignOrFilter = this.FILTER : this.assignOrFilter = this.ASSIGN;
    this.nameFilter = "";
    this.trainingCycleFilter = this.trainingCycle[0];
  }

  onFilterChange() {
    this.tableFilterOfNameAndTrainingCycleService.announceNewFilter([this.nameFilter, this.trainingCycleFilter.type])
  }

  editStudentSelectiveCourses() {
    const initialState = {
      studyYear: this.selectedYear,
      degreeId: this.selectedDegreeId,
      semester: this.selectedSemester,
    };
    const modalRef = this.modalService.show(EditStudentDialogComponent, {initialState, class: 'modal-custom'});
  }

  addStudentsSelectiveCourses() {
    const initialState = {
      selectedYear: this.selectedYear,
    };
    const modalRef = this.modalService.show(AddCoursesForStudentsComponent, {initialState, class: 'modal-custom'});
  }

  openDialogSelectedByGroup() {
    const initialState = {
      selectedYear: this.selectedYear,
    };
    const modalRef = this.modalService.show(CoursesByGroupComponent, {initialState, class: 'modal-custom'});
  }

  showStudentStatisticsOfSelectiveCourses() {
    const initialState = {
      selectedYear: this.selectedYear,
    };
    const modalRef = this.modalService.show(SelectiveCoursesStatisticsComponent, { initialState, class: 'modal-custom'});
  }

  saveNamesGroups() {
    const initialState = {
      degrees: this.degrees,
    };
    const modalRef = this.modalService.show(GroupNamesGenerationComponent, {initialState, class: 'modal-custom'});
  }

  importSelectiveCoursesFromCsv() {
    const initialState = {
      studyYear: this.selectedYear,
      degreeId: this.selectedDegreeId,
      degrees: this.degrees,
    };

    const modalRef = this.modalService.show(ImportCsvComponent, {initialState, keyboard: true, backdrop: 'static', ignoreBackdropClick: true});
  }
}
