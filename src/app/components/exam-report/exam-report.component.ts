import {Component, OnInit} from '@angular/core';

import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {CourseForGroup} from '../../models/CourseForGroup';
import {StudentDegree} from '../../models/StudentDegree';
import {ExamReportService} from '../../services/exam-report.service';
import {SelectiveCourseService} from '../../services/selective-course.service';
import {SelectiveCourse} from '../../models/SelectiveCourse';

@Component({
  selector: 'exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.scss']
})
export class ExamReportComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;

  groups: StudentGroup[];
  currentGroup: StudentGroup;
  students: StudentDegree[];

  coursesForGroup: CourseForGroup[];
  coursesSelected: boolean;

  years: Array<number>;
  selectedYear: number;
  semesters: Array<number>;
  selectedSemester: number;

  examReportLoading = false;

  currentSelectiveCourse: SelectiveCourse;
  selectiveCourses: SelectiveCourse[];
  isGroupSelected = true;

  constructor(private groupService: GroupService,
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

  onDegreeChange(): void {
    if (this.isGroupSelected) {
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
    } else {
      this.onSelectiveCoursesByDegreeOrSemesterChange();
    }
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

  onSemesterOrGroupChange(): void {
    if (this.isGroupSelected) {
      this.courseForGroupService.getCoursesForGroupAndSemester(this.currentGroup.id,
        (this.selectedYear - 1) * 2 + this.selectedSemester)
        .subscribe(coursesForGroup => {
          this.coursesForGroup = coursesForGroup;
          this.coursesSelected = true;
          this.onSelectAllCourses(true);
          this.students = this.currentGroup.studentDegrees;
        });
    } else {
      this.onSelectiveCoursesByDegreeOrSemesterChange();
    }
  }

  onSelectAllCourses(checked: boolean): void {
    if (this.isGroupSelected) {
      for (const courseForGroup of this.coursesForGroup) {
        courseForGroup.selected = checked;
      }
    } else {
      for (const selectiveCourse of this.selectiveCourses) {
        if (selectiveCourse.id === this.currentSelectiveCourse.id) {
          selectiveCourse.selected = checked;
        }
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

  setInitialSemester(): void {
    const currentDate = new Date();
    if (currentDate.getMonth() > 1 && currentDate.getMonth() < 9) {
      this.selectedSemester = 2;
    } else {
      this.selectedSemester = 1;
    }
  }

  onSelectiveCoursesByDegreeOrSemesterChange(): void {
    const currentYear = new Date().getFullYear().toString();

    this.selectiveCourseService.getSelectiveCourses(
      currentYear,
      this.currentDegree.id,
      this.selectedSemester).subscribe(selectiveCourses => {
        this.selectiveCourses = selectiveCourses;

        if (this.selectiveCourses) {
          this.currentSelectiveCourse = selectiveCourses[0];
          this.onSelectiveCourseChange();
        }
    });
  }

  getStudentsBySelectiveCourse(selectiveCourseId: number): void {
    this.selectiveCourseService.getSelectiveCourseStudents(selectiveCourseId)
      .subscribe(coursesWithStudents => {
        this.students = coursesWithStudents.studentDegrees;
      });
  }

  onSelectiveCourseChange(): void {
    if (this.currentSelectiveCourse) {
      this.getStudentsBySelectiveCourse(this.currentSelectiveCourse.id);
      this.onSelectAllCourses(true);
    }
  }
}
