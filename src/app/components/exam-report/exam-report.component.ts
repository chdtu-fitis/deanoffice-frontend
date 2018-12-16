import { Component, OnInit } from '@angular/core';
import { Degree } from '../../models/Degree';
import { DegreeService } from '../../services/degree.service';
import { StudentGroup } from '../../models/StudentGroup';
import { GroupService } from '../../services/group.service';
import { CourseForGroupService } from '../../services/course-for-group.service';
import { CourseForGroup } from '../../models/CourseForGroup';
import { StudentDegree } from '../../models/StudentDegree';
import { ExamReportService } from '../../services/exam-report.service';

@Component({
  selector: 'exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: [ './exam-report.component.scss' ]
})
export class ExamReportComponent implements OnInit {
  degrees: Degree[];
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
  examReportJournalTableLoading = false;
  gradesJournalStudentsTableLoading = false;
  gradesJournalCoursesTableLoadingPdf = false;
  gradesJournalCoursesTableLoadingDocx = false;
  studentsListLoading = false;

  constructor(private groupService: GroupService, private degreeService: DegreeService,
              private courseForGroupService: CourseForGroupService, private examReportService: ExamReportService){ }

  ngOnInit() {
    this.years = [
      1, 2, 3, 4, 5, 6
    ];
    this.semesters = [
      1, 2
    ];
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
        if (this.groups) {
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
          this.onSemesterOrGroupChange();
        }
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        if (groups){
          this.groups = groups;
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
        this.onSelectAllCourses(true);
        this.students = this.currentGroup.studentDegrees;
      });
  }

  onSelectAllCourses(checked: boolean): void {
    for (let courseForGroup of this.coursesForGroup) {
      courseForGroup.selected = checked;
    }
  }

  onExamReportBuild(): void {
    let courseIds = [];
    for (let courseForGroup of this.coursesForGroup) {
      if (courseForGroup.selected){
        courseIds.push(courseForGroup.course.id);
      }
    }
    this.examReportLoading = true;
    this.examReportService
      .buildExamReport(this.currentGroup.id, courseIds)
      .subscribe(() => this.examReportLoading = false);
  }

  onExamReportJournalBuild(): void {
    this.examReportJournalTableLoading = true;
    const semester = (this.selectedYear - 1) * 2 + this.selectedSemester;
    this.examReportService
      .buildExamReportJournalDoc(this.selectedYear, this.currentDegree.id, semester)
      .subscribe(() => this.examReportJournalTableLoading = false);
  }

  onGradesJournalStudentsListBuild() {
    this.gradesJournalStudentsTableLoading = true;
    this.examReportService
      .buildGradesJournalStudentsPdf(this.selectedYear, this.currentDegree.id)
      .subscribe(() => this.gradesJournalStudentsTableLoading = false);
  }

  onGradesJournalCoursesListBuildPdf() {
    this.gradesJournalCoursesTableLoadingPdf = true;
    this.examReportService.buildGradesJournalCoursesPdf(this.selectedYear, this.currentDegree.id).subscribe(a => {
      this.gradesJournalCoursesTableLoadingPdf = false;
    });
  }

  onGradesJournalCoursesListBuildDocx() {
    this.gradesJournalCoursesTableLoadingDocx = true;
    this.examReportService.buildGradesJournalCoursesDocx(this.selectedYear, this.currentDegree.id).subscribe(a => {
      this.gradesJournalCoursesTableLoadingDocx = false;
    });
  }

  onStudentsListBuild() {
    this.studentsListLoading = true;
    this.examReportService.buildStudentsList(this.selectedYear, this.currentDegree.id).subscribe(a => {
      this.studentsListLoading = false;
    });
  }

  setInitialSemester(): void {
    let currentDate = new Date();
    if (currentDate.getMonth() > 1 && currentDate.getMonth() < 9) {
      this.selectedSemester = 2;
    } else {
      this.selectedSemester = 1;
    }
  }
}
