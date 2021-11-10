import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCoursesStudentDegree} from '../../../models/SelectiveCoursesStudentDegree';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/Course';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../../shared/constant';
import {COLUMN_DEFINITIONS} from '../../course/column-set';
import {CoursePagination} from '../../../models/course/CoursePagination';
import {CourseFilter} from '../../course/models/CourseFilter';
import {CourseNameSearchParam} from '../../course/models/CourseNameSearchParam.enum';
import {KnowledgeControlType} from '../../course/models/KnowledgeControlType.enum';
import {AgGridModules, commonAgGridModules} from '../../shared/ag-grid';

import {GroupService} from '../../../services/group.service';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {TeacherService} from '../../../services/teacher.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import {StudentGroup} from '../../../models/StudentGroup';
import {Teacher} from '../../../models/Teacher';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {AddedCoursesComponent} from '../../courses-for-groups/added-courses/added-courses.component';
import {CourseCreationComponent} from '../../courses-for-groups/course-creation/course-creation.component';
import {CopyCoursesDialogComponent} from '../../courses-for-groups/copy-courses-dialog/copy-courses-dialog.component';
import {StudiedCoursesComponent} from '../../shared/studied-courses/studied-courses.component';
import {TeacherDialogComponent} from '../../courses-for-groups/teacher-dialog/teacher-dialog.component';
import {CurrentUserService} from '../../../services/auth/current-user.service';
import {GroupsDifferentDialogComponent} from '../../courses-for-groups/groups-different-dialog/groups-different-dialog.component';
import {AlertsService} from '../../shared/alerts/alerts.service';
import {Degree} from '../../../models/Degree';
import {StudentDegree} from '../../../models/StudentDegree';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {DegreeService} from '../../../services/degree.service';
import {ExamReportService} from '../../../services/exam-report.service';


@Component({
  selector: 'add-courses-for-students',
  templateUrl: './add-courses-for-students.component.html',
  styleUrls: ['./add-courses-for-students.component.scss'],
  providers: [GroupService, CourseForGroupService, GroupService]
})
export class AddCoursesForStudentsComponent implements OnInit {
  semesters:number[] = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedSemester: number = 1;

  degrees: Degree[] = [];
  currentDegree: Degree;

  groups: StudentGroup[];
  currentGroup: StudentGroup;
  students: StudentDegree[];

  coursesForGroup: CourseForGroup[];
  coursesSelected: boolean;

  years: Array<number>;
  selectedYear: number;
  // semesters: Array<number>;
  // selectedSemester: number;

  examReportLoading = false;

  selectiveCourses: SelectiveCourse[];
  isGroupSelected = true;
  selectiveCourseGroupName: string;




  changesExistence = false;
  showAcademicDifference = false;
  groupsForCopy: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedHoursPerCredit: number;
  hoursPerCreditCBDisabled = true;
  courses: Course[];
  coursesForAdd: CourseForGroup[] = [];
  coursesForDelete: CourseForGroup[] = [];
  updatedCourses: CourseForGroup[] = [];
  selectedCourses: Course[] = [];
  searchText = '';
  deleteCoursesIds: number[] = [];
  deleteCoursesIdsForCheck: number[] = [];
  @ViewChild(AddedCoursesComponent, { static: true }) addedCoursesChild: AddedCoursesComponent;
  @ViewChild(StudiedCoursesComponent, { static: false }) studiedCoursesChild: StudiedCoursesComponent;
  @ViewChild(CourseCreationComponent, { static: false }) courseCreationChild: CourseCreationComponent;
  @ViewChild(GroupsDifferentDialogComponent, { static: false }) groupsDifferentDialogComponent: GroupsDifferentDialogComponent;
  studiedCoursesLoading = false;
  showPage = false;

  studyYear: string;
  selectiveCoursesStudentDegrees: SelectiveCoursesStudentDegree[] = [];
  isButtonClicked = false;

  form = new FormGroup({
    'surname': new FormControl('', [Validators.required]),


  })


  @Output() onSelectedCoursesChange = new EventEmitter();
  @Input() loading: boolean;


  constructor(public bsModalRef: BsModalRef, private groupService: GroupService,
              private degreeService: DegreeService,
              private courseForGroupService: CourseForGroupService,
              private examReportService: ExamReportService,
              private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.years = [1, 2, 3, 4, 5, 6];
    this.semesters = [1, 2];
    this.selectedYear = 1;
    this.setInitialSemester();

    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        if (this.degrees) {
          this.currentDegree = this.degrees[0];
          this.onDegreeChange();
        }
      });

  }
  changeSelectedCoursesList(checked: boolean, selectedCourse: Course) {
    if (!checked) {
      for (const course of this.selectedCourses) {
        if (course.id === selectedCourse.id) {
          this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
        }
      }
    } else {
      this.selectedCourses.push(selectedCourse)
    }
    this.onSelectedCoursesChange.emit(this.selectedCourses);
  }

  clearSelection() {
    this.selectedCourses.forEach(course => course.selected = false);
    this.selectedCourses = [];
    this.onSelectedCoursesChange.emit(this.selectedCourses);
  }

  onDegreeChange(): void {
    this.selectedYear = 1;
    this.groupService.getGroupsByDegreeAndRealYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        this.groups = groups;
        if (this.groups && this.groups.length) {
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
          this.onSemesterOrGroupChange();
        }
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndRealYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        if (groups && groups.length) {
          this.groups = groups;
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
          this.onSemesterOrGroupChange();
        }
      });
  }

  onSemesterOrGroupChange(): void {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.currentGroup.id,
      (this.selectedYear - 1) * 2 + this.selectedSemester)
      .subscribe(coursesForGroup => {
        this.coursesForGroup = coursesForGroup;
        this.coursesSelected = true;
        this.onSelectAllCourses(true);
        this.students = this.currentGroup.studentDegrees;
      });
  }

  onSelectAllCourses(checked: boolean): void {
    if (this.isGroupSelected) {
      for (const courseForGroup of this.coursesForGroup) {
        courseForGroup.selected = checked;
      }
    } else {
      for (const selectiveCourse of this.selectiveCourses) {
        selectiveCourse.selected = checked;
      }
    }
  }

  onExamReportBuild(): void {
    const courseIds = [];
    for (const courseForGroup of this.coursesForGroup) {
      if (courseForGroup.selected) {
        courseIds.push(courseForGroup.course.id);
      }
    }
    this.examReportLoading = true;
    this.examReportService.buildExamReport(this.currentGroup.id, courseIds).subscribe(() => {
        this.examReportLoading = false;
      }
    );
  }

  onSelectiveCourseExamReportBuild(): void {
    const selectiveCourseIds = [];
    for (const selectiveCourse of this.selectiveCourses) {
      if (selectiveCourse.selected) {
        selectiveCourseIds.push(selectiveCourse.id);
      }
    }
    this.examReportLoading = true;
    this.examReportService.buildSelectiveCoursesExamReport(selectiveCourseIds).subscribe(() => {
        this.examReportLoading = false;
      }
    );
  }

  setInitialSemester(): void {
    const currentDate = new Date();
    if (currentDate.getMonth() > 1 && currentDate.getMonth() < 9) {
      this.selectedSemester = 2;
    } else {
      this.selectedSemester = 1;
    }
  }

  onSelectiveCoursesByDegreeOrSemesterChange(): void {
    this.selectiveCourseService.getSelectiveCoursesForThisAcademicYear(
      this.currentDegree.id,
      (this.selectedYear - 1) * 2 + this.selectedSemester).subscribe(selectiveCourses => {
      this.selectiveCourses = selectiveCourses;
      this.students = [];
      this.selectiveCourseGroupName = '';

      if (this.selectiveCourses.length > 0) {
        this.coursesSelected = true;
        this.onSelectAllCourses(true);
        this.getStudentsBySelectiveCourse(true, selectiveCourses[0].id)
      }
    });
  }

  getStudentsBySelectiveCourse(checked: boolean, selectiveCourseId: number): void {
    if (!checked) {
      for (const selectiveCourse of this.selectiveCourses) {
        if (selectiveCourse.selected) {
          selectiveCourseId = selectiveCourse.id;
          break;
        } else
        if (!selectiveCourse.selected) {
          selectiveCourseId = 0;
        }
      }
    }
    if (selectiveCourseId === 0) {
      this.students = [];
      this.selectiveCourseGroupName = '';
      return;
    }

    this.selectiveCourseService.getSelectiveCourseStudents(selectiveCourseId, true)
      .subscribe(coursesWithStudents => {
        this.students = coursesWithStudents.studentDegrees;
        this.selectiveCourseGroupName = coursesWithStudents.selectiveCourse ? coursesWithStudents.selectiveCourse.groupName : '';
      });
  }

}
