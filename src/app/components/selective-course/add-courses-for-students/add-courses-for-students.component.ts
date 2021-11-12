import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import { CourseService } from '../../../services/course.service';
import {GroupService} from '../../../services/group.service';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {StudentGroup} from '../../../models/StudentGroup';
import {Degree} from '../../../models/Degree';
import {StudentDegree} from '../../../models/StudentDegree';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {DegreeService} from '../../../services/degree.service';
import {ExamReportService} from '../../../services/exam-report.service';
import {TypeCycle} from '../../../models/TypeCycle';
import {CourseForGroup} from '../../../models/CourseForGroup';

@Component({
  selector: 'add-courses-for-students',
  templateUrl: './add-courses-for-students.component.html',
  styleUrls: ['./add-courses-for-students.component.scss']
})
export class AddCoursesForStudentsComponent implements OnInit {
  degrees: Degree[] = [];
  currentDegree: Degree;
  groups: StudentGroup[];
  currentGroup: StudentGroup;
  students: StudentDegree[];
  selectedYear: string;
  selectiveCourses: SelectiveCourse[];
  years: number[];
  currentYear: number = 1;
  selectiveCourseGroupName: string;
  selectedSemester: number;
  coursesForGroup: CourseForGroup[];
  coursesSelected: boolean;
  semesters: Array<number>;
  typeCycle = TypeCycle;




  constructor(public bsModalRef: BsModalRef, private groupService: GroupService,
              private degreeService: DegreeService,
              private courseForGroupService: CourseForGroupService,
              private examReportService: ExamReportService,
              private selectiveCourseService: SelectiveCourseService){ }

  ngOnInit() {
    this.years = [1, 2, 3, 4, 5, 6];
    this.semesters = [1, 2];
    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        if (this.degrees) {
          this.currentDegree = this.degrees[0];
          this.onDegreeChange();
          this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.currentDegree.id, this.currentYear, false)
            .subscribe(selectiveCourses => {
              this.selectiveCourses = selectiveCourses;
            });
        }
      });

  }
  onDegreeChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.currentYear)
      .subscribe(groups => {
        this.groups = groups;
        if (this.groups && this.groups.length) {
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
          this.onGroupChange();
        }
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.currentYear)
      .subscribe(groups => {
        if (groups && groups.length) {
          this.groups = groups;
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
          this.onGroupChange();
        }
      });
  }

  onGroupChange() {
    this.students = this.currentGroup.studentDegrees;

  }

}
