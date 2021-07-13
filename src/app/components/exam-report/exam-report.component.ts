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

  selectiveCourses: SelectiveCourse[];
  isGroupSelected = true;
  selectiveCourseGroupName: string;

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
    this.selectedYear = 1;
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
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
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
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
