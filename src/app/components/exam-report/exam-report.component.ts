import {Component, OnInit} from '@angular/core';
import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';
import {StudentGroup} from "../../models/StudentGroup";
import {GroupService} from "../../services/group.service";
import {CourseForGroupService} from "../../services/course-for-group.service";
import {CourseForGroup} from "../../models/CourseForGroup";
import {Course} from "../../models/Course";
import {StudentDegree} from "../../models/StudentDegree";
import {ExamReportService} from "../../services/exam-report.service";

@Component({
  selector: 'exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.scss']
})
export class ExamReportComponent implements OnInit {
  degrees: Degree[];
  currentDegree: Degree;

  groups: StudentGroup[];
  currentGroup: StudentGroup;

  coursesForGroup: CourseForGroup[];
  coursesSelected: boolean;

  years: Array<number>;
  selectedYear: number;
  semesters: Array<number>;
  selectedSemester: number;

  students: StudentDegree[];

  constructor(private groupService: GroupService, private degreeService: DegreeService,
              private courseForGroupService: CourseForGroupService, private examReportService: ExamReportService){ }

  ngOnInit() {
    this.years = [1, 2, 3, 4, 5];
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
    this.courseForGroupService.getCoursesForGroupAndSemester(this.currentGroup.id, (this.selectedYear-1)*2+this.selectedSemester)
      .subscribe(coursesForGroup => {
        this.coursesForGroup = coursesForGroup;
        this.coursesSelected = true;
        this.onSelectAllCourses(true);
        this.students = this.currentGroup.studentDegrees;
      });
  }

  onSelectAllCourses(checked: boolean): void {
    for (var courseForGroup of this.coursesForGroup) {
      courseForGroup.selected = checked;
    }
  }

  onExamReportBuild(): void {
    for (var courseForGroup of this.coursesForGroup) {
      if (courseForGroup.selected){
        this.examReportService.buildExamReport(this.currentGroup.id, courseForGroup.course.id);
      }
    }
  }

  onExamReportJournalBuild(): void {
      this.examReportService.buildExamReportJournalDoc(this.currentGroup.id, (this.selectedYear-1)*2+this.selectedSemester);
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
