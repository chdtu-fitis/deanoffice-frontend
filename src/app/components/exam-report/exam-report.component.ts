import {Component, OnInit} from '@angular/core';
import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';
import {StudentGroup} from "../../models/StudentGroup";
import {GroupService} from "../../services/group.service";
import {CourseForGroupService} from "../../services/course-for-group.service";
import {CourseForGroup} from "../../models/CourseForGroup";
import {Course} from "../../models/Course";
import {StudentDegree} from "../../models/StudentDegree";

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
  selectedCourses: CourseForGroup[];

  years: Array<number>;
  selectedYear: number;
  semesters: Array<number>;
  selectedSemester: number;

  students: StudentDegree[];

  constructor(private groupService: GroupService, private degreeService: DegreeService, private courseForGroupService: CourseForGroupService){ }

  ngOnInit() {
    this.years = [1, 2, 3, 4, 5];
    this.semesters = [1, 2];
    this.selectedYear = 1;

    this.selectInitialSemester();

    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        this.currentDegree = this.degrees[0];
        this.onDegreeChange();
      });
  }

  onDegreeChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        this.groups = groups;
        this.currentGroup = groups[0];
        this.students = this.currentGroup.studentDegrees;
        this.onSemesterOrGroupChange();
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        this.groups = groups;
        this.currentGroup = groups[0];
        this.students = this.currentGroup.studentDegrees;
        this.onSemesterOrGroupChange();
      });
  }

  onSemesterOrGroupChange(): void {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.currentGroup.id, this.selectedSemester)
      .subscribe(coursesForGroup => {
        this.coursesForGroup = coursesForGroup;
        this.students = this.currentGroup.studentDegrees;
      });
  }

  selectInitialSemester(): void {
    let currentDate = new Date();
    if (currentDate.getMonth() > 1 && currentDate.getMonth() < 9) {
      this.selectedSemester = 2;
    } else {
      this.selectedSemester = 1;
    }
  }

}
