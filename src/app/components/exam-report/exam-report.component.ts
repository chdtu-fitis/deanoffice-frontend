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
  groups: StudentGroup[];
  currentGroup: StudentGroup;
  currentGroupStudents: StudentDegree[];
  coursesForGroup: CourseForGroup[];

  years: Array<number>;
  selectedYear: number;
  semesters: Array<number>;
  selectedSemester: number;

  constructor(private groupService: GroupService, private degreeService: DegreeService, private courseForGroupService: CourseForGroupService){ }

  ngOnInit() {
    this.years = [ 1,2,3 ];
    this.semesters = [ 1,2];

    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        this.onDegreeChange('1', '1');
      });
    this.selectedYear = 1;
    let currentDate = new Date();
    if (currentDate.getMonth() > 1 && currentDate.getMonth() < 9) {
      this.selectedSemester = 1;
      console.log(this.selectedSemester);
    } else {
      this.selectedSemester = 2;
      console.log(this.selectedSemester);
    }
  }

  onDegreeChange(degreeId: string, year: string): void {
    this.groupService.getGroupsByDegreeAndYear(degreeId, year)
      .subscribe(groups => {
        this.groups = groups;
        this.currentGroup = groups[0];
        this.currentGroupStudents = this.currentGroup.studentDegrees;
        // this.onGroupChange(this.groups[0].id.toString());
      });
  }

  onYearChange(degreeId: string, year: string): void {
    this.groupService.getGroupsByDegreeAndYear(degreeId, year)
      .subscribe(groups => {
        this.groups = groups;
        this.currentGroup = groups[0];
      });
  }

  onSemesterChange(): void {
    console.log(this.selectedSemester);
    this.courseForGroupService.getCoursesForGroupAndSemester(this.currentGroup.id, this.selectedSemester)
      .subscribe(coursesForGroup => {
        this.coursesForGroup = coursesForGroup;
      });
  }

  // onCourseChange(year: string): void {
  //   this.groupService.getGroupsByDegreeAndYear(degreeId, year)
  //     .subscribe(groups => {
  //       this.groups = groups;
  //       this.currentGroup = groups[0];
  //       // this.onGroupChange(this.groups[0].id.toString());
  //     });
  // }


  // onGroupChange(groupId: string): void {
  //   this.students = this.groups.find(x => x.id == Number(groupId)).studentDegrees;
  //   for (var student of this.students) {student.selected = true;}
  //   this.studentsSelected = true;
  // }

}
