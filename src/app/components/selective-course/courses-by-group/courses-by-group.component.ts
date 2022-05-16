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

const ALL_ITEMS = 0;

@Component({
  selector: 'courses-by-group',
  templateUrl: './courses-by-group.component.html',
  styleUrls: ['./courses-by-group.component.scss']
})

export class CoursesByGroupComponent implements OnInit {
  selectedYear: string;
  studyYear: string;

  currentDegree: Degree;
  currentStudentsYear: number;
  currentFaculty: Faculty;
  currentGroup: StudentGroup;

  groups: StudentGroup[] = [];
  years: number[];
  degrees: Degree[] = [];
  faculties: Faculty[];
  filteredGroups: StudentGroup[] = [];

  selectedCourses: SelectiveCourseWithStudents[] = [];
  selectiveCoursesWithStudents: SelectiveCourseWithStudents[] = [];
  isAllCoursesSelected = false;

  typeCycle: TypeCycle;

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
        this.selectedCourses = [];
        this.onFacultyChange();
        this.onGroupOrAcademicYearChange();
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
    if (this.currentGroup) {
      this.showCoursesByGroup();
    }
    this.isAllCoursesSelected = false;
  }

  changeAllCoursesIsSelected(): void {
    if (this.selectiveCoursesWithStudents.length > 0 && this.isAllCoursesSelected) {
      this.selectiveCoursesWithStudents.forEach(item => item.selected = true);
    } else {
      this.selectiveCoursesWithStudents.forEach(item => item.selected = false);
      this.isAllCoursesSelected = false;
    }
  }

  changeSelectedCourses(checked: boolean, selectedCourse: SelectiveCourseWithStudents) {
    if (!checked) {
      for (const course of this.selectedCourses) {
        if (course.selectiveCourseId === selectedCourse.selectiveCourseId) {
          this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
          break;
        }
      }
    } else {
      this.selectedCourses.push(selectedCourse);
    }
    this.isAllCoursesSelected = false;
  }

  isSelectedCourseWithStudentsEmpty(): boolean {
    return this.selectiveCoursesWithStudents.length > 0;
  }

  showCoursesByGroup() {
    this.selectiveCourseService.getRegisteredStudentsAndCourseInGroup(this.currentGroup.id, +(this.selectedYear))
      .subscribe(selectiveCoursesWithStudents => {
        this.selectiveCoursesWithStudents = selectiveCoursesWithStudents;
        this.selectiveCoursesWithStudents.forEach(function (item, i, selectiveCoursesWithStudents) {
          if (item.trainingCycle === "GENERAL") {
            item.trainingCycle = TypeCycle.GENERAL;
          } else if (item.trainingCycle === "PROFESSIONAL") {
            item.trainingCycle = TypeCycle.PROFESSIONAL;
          }
        })
      });
  }
}