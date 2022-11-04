import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Degree} from '../../../models/Degree';
import {Faculty} from '../../../models/Faculty';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';
import {DegreeService} from '../../../services/degree.service';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FacultyService} from '../../../services/faculty.service';
import {TypeCycle} from '../../../models/TypeCycle';
import {SelectiveCourseWithStudents} from './model/SelectiveCourseWithStudents';
import {RegisteredByGroup} from './model/RegisteredByGroup';
import {Student} from './model/Student';
import {StudentDegree} from '../../../models/StudentDegree';
import {SelectionRule} from './model/SelectionRule';

const ALL_ITEMS = 0;

@Component({
  selector: 'courses-by-group',
  templateUrl: './courses-by-group.component.html',
  styleUrls: ['./courses-by-group.component.scss']
})

export class CoursesByGroupComponent implements OnInit {
  selectedYear: string;
  studyYear: string;
  courseNumberForOffer: number = 5;

  currentDegree: Degree;
  currentStudentsYear: number;
  currentFaculty: Faculty;
  currentGroup: StudentGroup;
  selectiveCoursesWithStudentsDegree: StudentDegree[];

  groups: StudentGroup[] = [];
  years: number[];
  degrees: Degree[] = [];
  faculties: Faculty[];
  filteredGroups: StudentGroup[] = [];

  selectiveCoursesWithStudents: SelectiveCourseWithStudents[] = [];
  selectiveCoursesWithAllStudents: SelectiveCourseWithStudents[] = [];
  studentsWithNoSelectedCourses: Student[] = [];
  registeredByGroup: RegisteredByGroup;
  isAllCoursesSelected = false;

  typeCycle: TypeCycle;
  btnStudentsWithNoSelectedCourses: boolean = false;

  constructor(public bsModalRef: BsModalRef, private groupService: GroupService,
              private degreeService: DegreeService, private selectiveCourseService: SelectiveCourseService,
              private facultyService: FacultyService) {
  }

  ngOnInit() {
    this.years = [1, 2, 3, 4];
    this.currentStudentsYear = 1;
    this.degreeService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
      if (this.degrees) {
        this.currentDegree = this.degrees[0];
        this.onDegreeOrYearChange();
      }
    });
    this.facultyService.getFaculties().subscribe((faculties: Faculty[]) => {
      this.faculties = faculties;
      const facultiesItemDefault = new Faculty();
      facultiesItemDefault.id = ALL_ITEMS;
      facultiesItemDefault.abbr = 'Не обрано';
      this.faculties.unshift(facultiesItemDefault);
      this.currentFaculty = this.faculties[0];
      this.currentFaculty.id = ALL_ITEMS;
    });
  }

  onDegreeOrYearChange(): void {
    this.groupService.getGroupsByDegreeAndRealYear(this.currentDegree.id, this.currentStudentsYear)
      .subscribe(groups => {
        this.groups = groups ? groups : [];
        const groupsItem = new StudentGroup();
        groupsItem.name = 'Не обрано';
        groupsItem.id = ALL_ITEMS;

        this.groups.unshift(groupsItem);
        this.currentGroup = this.groups[0];

        this.filteredGroups = this.groups;
        this.onFacultyChange();
        this.onGroupOrAcademicYearChange();
      });

    this.selectiveCourseService.getSelectionRules(this.currentDegree.id, this.currentStudentsYear, this.selectedYear)
      .subscribe((selectionRules: SelectionRule[]) => {
        this.courseNumberForOffer = 0;
        for (let selectionRule of selectionRules) {
          this.courseNumberForOffer += selectionRule.selectiveCoursesNumber.reduce((partialSum, a) => partialSum + a, 0);
        }
      });
  }

  isGroupSelected(): boolean {
    return this.currentGroup === this.groups[0];
  }

  onFacultyChange() {
    if (this.currentFaculty.id === ALL_ITEMS) {
      this.filteredGroups = this.groups;
    } else {
      this.filteredGroups = this.groups.filter(group => !group.specialization || group.specialization.facultyId == this.currentFaculty.id);
    }
  }

  onGroupOrAcademicYearChange() {
    if (this.currentGroup && this.currentGroup.id != 0) {
      this.getCoursesAndStudentsInGroup();
    }
    this.isAllCoursesSelected = false;
  }

  changeExpanded(course: SelectiveCourseWithStudents) {
    if(course.expanded) {
      course.expanded = false;
    } else {
      course.expanded = true;
    }
  }

  changeAllCoursesIsSelected(): void {
    if (this.registeredByGroup.coursesSelectedByStudentsGroup.length > 0 && this.isAllCoursesSelected) {
      this.registeredByGroup.coursesSelectedByStudentsGroup.forEach(item => item.selected = true);
    } else {
      this.registeredByGroup.coursesSelectedByStudentsGroup.forEach(item => item.selected = false);
      this.isAllCoursesSelected = false;
    }
  }

  isSelectedCourseWithStudentsEmpty(): boolean {
    return this.selectiveCoursesWithStudents.length > 0;
  }

  getCoursesAndStudentsInGroup() {
    this.btnStudentsWithNoSelectedCourses = false;
    this.selectiveCourseService.getRegisteredStudentsAndCourseInGroup(this.currentGroup.id, +(this.selectedYear))
      .subscribe(registeredByGroup => {
        this.registeredByGroup = registeredByGroup;
        this.selectiveCoursesWithStudents = registeredByGroup.coursesSelectedByStudentsGroup;
        this.studentsWithNoSelectedCourses = registeredByGroup.groupStudentsWithNoSelectedCourses;
        this.selectiveCoursesWithStudents.forEach(function (item, i, selectiveCoursesWithStudents) {
          if (item.trainingCycle === "GENERAL") {
            item.trainingCycle = TypeCycle.GENERAL;
          } else if (item.trainingCycle === "PROFESSIONAL") {
            item.trainingCycle = TypeCycle.PROFESSIONAL;
          }
        });
        this.setIsCourseSelected();
      });
  }

  setIsCourseSelected() {

    for (let selectiveCourseWithStudents of this.selectiveCoursesWithStudents) {
      selectiveCourseWithStudents.students.forEach(student => student.isCourseSelected = true);
    }
    this.studentsWithNoSelectedCourses.forEach(student => student.isCourseSelected = false);
  }

  showStudentsWithNoSelectedCourses(): boolean {
    this.convertToCommonStudent();
    this.btnStudentsWithNoSelectedCourses = true;
    return this.btnStudentsWithNoSelectedCourses;
  }

  convertToCommonStudent() {
    for (let selectiveCourseWithStudents of this.selectiveCoursesWithStudents) {
      selectiveCourseWithStudents.students.push(...this.studentsWithNoSelectedCourses);
      selectiveCourseWithStudents.students.sort((a, b) =>
        (a.name).localeCompare(b.name));
    }
  }

  onSave() {
    let selectedCourses = this.selectiveCoursesWithStudents.filter(selectiveCourse => selectiveCourse.selected);
    if (selectedCourses.length <= this.courseNumberForOffer) {
      const body = {
        selectiveCourses: selectedCourses.map(selectedCourse => selectedCourse.selectiveCourseId),
        studentDegrees: this.studentsWithNoSelectedCourses.map(student => student.id),
        studyYear: +this.selectedYear
      }
      this.selectiveCourseService.assignMultipleCoursesForMultipleStudents(body).subscribe((response: any) => {
        this.isAllCoursesSelected = false;
        this.getCoursesAndStudentsInGroup();
        alert(response.message)
      }, error => {
        alert(error.message);
      });
    } else {
      alert("Кількість обраних дисциплін перевищує допустиму кількість: " + this.courseNumberForOffer);
    }
  }
}
