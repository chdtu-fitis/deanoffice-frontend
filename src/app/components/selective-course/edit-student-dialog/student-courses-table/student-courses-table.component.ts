import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesStudentDegree} from '../../../../models/SelectiveCoursesStudentDegree';
import {TypeCycle} from '../../../../models/TypeCycle';
import {SelectiveCourse} from "../../../../models/SelectiveCourse";
import {SelectiveCourseService} from "../../../../services/selective-course.service";

@Component({
  selector: 'student-coures-table',
  templateUrl: './student-courses-table.component.html',
  styleUrls: ['./student-courses-table.component.scss']
})
export class StudentCoursesTableComponent implements OnInit {

  @Input() selectiveCoursesStudentDegrees: SelectiveCoursesStudentDegree[];
  typeCycle = TypeCycle;
  searchText: string;
  selectiveCourses: SelectiveCourse[];

  constructor(private selectiveCourseService: SelectiveCourseService) {
  }

  ngOnInit() {
    for (let selectiveCoursesStudentDegree of this.selectiveCoursesStudentDegrees) {
      for (let selectiveCourse of selectiveCoursesStudentDegree.selectiveCourses) {
        (selectiveCourse as any).isBeingEdited = false;
      }
    }
  }

  editSubstituteCourse(i: number, j: number): void {
    this.getSelectiveCourse(i, j).isBeingEdited = true;
  }

  saveSubstituteCourse(i: number): void {
    console.log('save');
  }

  cancelSubstituteCourse(i: number, j: number): void {
    this.getSelectiveCourse(i, j).isBeingEdited = false;
  }

  getSelectiveCourses(i: number, j: number) {
    if (!this.selectiveCourses && !this.selectiveCourses.length) {

    }
    let degreeId = this.selectiveCoursesStudentDegrees[i].studentDegree.specialization.degree.id;
    // this.selectiveCoursesStudentDegrees[i].selectiveCourses
    // this.selectiveCourseService.getSelectiveCourses(this.studyYear, degreeId, this.semester, true)
    //   .subscribe((selectiveCourses: SelectiveCourse[]) => {
    //
    //     this.selectiveCourses = selectiveCourses;
    //   });
  }

  getSelectiveCourse(i: number, j: number): any {
    return this.selectiveCoursesStudentDegrees[i].selectiveCourses[j] as any;
  }
}
