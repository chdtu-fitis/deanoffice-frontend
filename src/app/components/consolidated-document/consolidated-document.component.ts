import { Component, OnInit } from '@angular/core';
import { Degree } from '../../models/Degree';
import { GroupService } from '../../services/group.service';
import { StudentGroup } from '../../models/StudentGroup';
import { StudentDegree } from '../../models/StudentDegree';
import { CourseForGroupService } from '../../services/course-for-group.service';
import {CourseForGroup} from '../../models/CourseForGroup';
import {DegreeService} from '../../services/degree.service';

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

  years: Array<number>;
  selectedYear: number;
  semesters: Array<number>;
  selectedSemester: number;

  static getInitialSemester(): number {
    const currentDate = new Date();
    return currentDate.getMonth() > 1 && currentDate.getMonth() < 9 ? 2 : 1;
  }

  constructor(private groupService: GroupService,
              private courseForGroupService: CourseForGroupService,
              private degreeService: DegreeService) { }

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
    this.courseForGroupService.getCoursesForGroupAndSemester(this.currentGroup.id, (this.selectedYear-1)*2+this.selectedSemester)
      .subscribe(coursesForGroup => {
        this.coursesForGroup = coursesForGroup;
        this.coursesSelected = true;
        // this.onSelectAllCourses(true);
        this.students = this.currentGroup.studentDegrees;
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

}
