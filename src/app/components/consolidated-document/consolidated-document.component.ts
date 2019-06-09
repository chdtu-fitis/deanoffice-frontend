import {Component, OnInit} from '@angular/core';
import {Degree} from '../../models/Degree';
import {GroupService} from '../../services/group.service';
import {StudentGroup} from '../../models/StudentGroup';
import {StudentDegree} from '../../models/StudentDegree';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {CourseForGroup} from '../../models/CourseForGroup';
import {DegreeService} from '../../services/degree.service';
import {ConsolidatedDocumentService} from '../../services/consolidated-document.service';
import {Course} from '../../models/Course';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'consolidated-document',
  templateUrl: './consolidated-document.component.html',
  styleUrls: ['./consolidated-document.component.scss']
})
export class ConsolidatedDocumentComponent implements OnInit {
  degrees: Degree[];
  currentDegree: Degree;

  groups: StudentGroup[];
  currentGroup: StudentGroup;
  students: StudentDegree[];

  coursesForGroup: CourseForGroup[];
  coursesSelected: boolean;
  coursesForGroup$ = new BehaviorSubject<Array<CourseForGroup>>([]);

  years: Array<number>;
  selectedYear: number;
  semesters: Array<number>;
  selectedSemester: number;
  courseForGroupToStudentGroups: Map<CourseForGroup, Array<StudentGroup>> = new Map<CourseForGroup, Array<StudentGroup>>();
  selectedCourseForGroup: CourseForGroup;
  selectedStudentGroups: StudentGroup[];

  static getInitialSemester(): number {
    const currentDate = new Date();
    return currentDate.getMonth() > 1 && currentDate.getMonth() < 9 ? 2 : 1;
  }

  constructor(private groupService: GroupService,
              private courseForGroupService: CourseForGroupService,
              private degreeService: DegreeService,
              private consolidatedDocumentService: ConsolidatedDocumentService) { }

  ngOnInit() {
    this.years = [1, 2, 3, 4, 5, 6];
    this.semesters = [1, 2];
    this.selectedYear = 1;
    this.selectedSemester = ConsolidatedDocumentComponent.getInitialSemester();

    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        if (this.degrees) {
          this.currentDegree = this.degrees[0];
          this.onDegreeChange();
        }
      });
  }

  onDegreeChange(): void {
    this.selectedYear = 1;
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        this.groups = groups;
        if (this.groups) {
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
          this.onSemesterOrGroupChange();
        }
      });
  }

  onSemesterOrGroupChange(): void {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.currentGroup.id, (this.selectedYear - 1) * 2 + this.selectedSemester)
      .subscribe(coursesForGroup => {
        this.coursesForGroup = coursesForGroup;
        this.coursesSelected = true;
        // this.onSelectAllCourses(true);
        this.students = this.currentGroup.studentDegrees;

        this.loadStudentGroupByCourses(coursesForGroup.map(value => value.course), coursesForGroup);
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        if (groups) {
          this.groups = groups;
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
          this.onSemesterOrGroupChange();
        }
      });
  }

  private loadStudentGroupByCourses(courses: Course[], coursesForGroup: CourseForGroup[]) {
    this.consolidatedDocumentService.getGroupThatLearnSameCourses(courses)
      .subscribe(coursesToStudentGroupMap => {
        const coursesForGroupToStudentGroup = new Map<CourseForGroup, Array<StudentGroup>>();
        coursesToStudentGroupMap.forEach((studentGroups, course) => {
          const courseForGroup = coursesForGroup
            .find(courseForGroupValue => courseForGroupValue.course.id === course.id);
          coursesForGroupToStudentGroup.set(courseForGroup, studentGroups);
        });
        this.courseForGroupToStudentGroups.clear();
        coursesForGroupToStudentGroup.forEach((v, k) => {
          const studentGroupsWithoutCurrent = v.filter(studentGroup => studentGroup.id !== this.currentGroup.id);
          this.courseForGroupToStudentGroups.set(k, studentGroupsWithoutCurrent);
        });
        const arr = [];
        this.courseForGroupToStudentGroups.forEach((ignore, key) => {
          arr.push(key);
        });
        this.coursesForGroup$.next(arr);
        const value = this.courseForGroupToStudentGroups[Symbol.iterator]().next().value;
        this.selectedCourseForGroup = value[0];
        this.selectedStudentGroups = value[1];
      });
  }

  handleCourseForGroupClick(courseForGroup: CourseForGroup) {
    this.selectedCourseForGroup = courseForGroup;
    this.selectedStudentGroups = this.courseForGroupToStudentGroups.get(courseForGroup);
  }

  getGroupCountForCourse(courseForGroup: CourseForGroup): number {
    return this.courseForGroupToStudentGroups.get(courseForGroup).length;
  }

  handleMarkStudentGroupClick(studentGroup: StudentGroup) {
    studentGroup.selected = !studentGroup.selected;
    if (studentGroup.selected) {
      this.selectedCourseForGroup.selected = true;
    }
  }

  handlerFormConsolidatedDocumentClick(event: MouseEvent) {
    const obj: any = {};
    this.courseForGroupToStudentGroups.forEach((value, key) => {
      if (!key.selected) {
        return;
      }
      const studentGroups = value.filter(studentGroup => studentGroup.selected);
      obj[key.id] = [this.currentGroup.id];
      if (studentGroups.length !== 0) {
        obj[key.id].push(...studentGroups
                        .filter(studentGroup => studentGroup.id !== this.currentGroup.id)
                        .map(studentGroup => studentGroup.id));
      }
    });
    console.log(obj);
    this.consolidatedDocumentService.formConsolidatedDocument(obj);
  }

}
