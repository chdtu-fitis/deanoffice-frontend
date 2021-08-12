import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesStudentDegree} from '../../../../models/SelectiveCoursesStudentDegree';
import {TypeCycle} from '../../../../models/TypeCycle';
import {SelectiveCourse} from "../../../../models/SelectiveCourse";
import {SelectiveCourseService} from "../../../../services/selective-course.service";
import {SelectiveCoursesStudentDegreeSubstitution} from "../../../../models/SelectiveCoursesStudentDegreeSubstitution";
import {ExistingId} from "../../../../models/ExistingId";

@Component({
  selector: 'student-coures-table',
  templateUrl: './student-courses-table.component.html',
  styleUrls: ['./student-courses-table.component.scss']
})
export class StudentCoursesTableComponent implements OnInit {

  @Input() selectiveCoursesStudentDegrees: SelectiveCoursesStudentDegree[];
  typeCycle = TypeCycle;
  allSelectiveCoursesInSemesters = {};
  studentDegreeOnEdit: ExistingId;
  studyYearOnEdit: number;
  editedCourseSemester: string;
  newSelectiveCourseOnEdit: any;
  newSelectiveCourseOnEditName: string;
  oldSelectiveCourseOnEditId: number;

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
    let selectiveCourse = this.getSelectiveCourse(i, j);
    selectiveCourse.isBeingEdited = true;
    this.oldSelectiveCourseOnEditId = selectiveCourse.id;
    this.studentDegreeOnEdit = new ExistingId(this.selectiveCoursesStudentDegrees[i].studentDegree.id);
    this.studyYearOnEdit = selectiveCourse.studyYear;
    this.editedCourseSemester = selectiveCourse.course.semester;
    if (!this.allSelectiveCoursesInSemesters[this.editedCourseSemester]) {
      let degreeId = this.selectiveCoursesStudentDegrees[i].studentDegree.specialization.degree.id;
      this.getAllSelectiveCoursesInSemester(selectiveCourse, degreeId);
    }
  }

  saveSubstituteCourse(i: number, j: number): void {
    let selectiveCoursesStudentDegreeSubstitution = new SelectiveCoursesStudentDegreeSubstitution([this.newSelectiveCourseOnEdit.id], [this.oldSelectiveCourseOnEditId], this.studentDegreeOnEdit, this.studyYearOnEdit);
    this.selectiveCourseService.substituteSelectiveCoursesForStudentDegree(selectiveCoursesStudentDegreeSubstitution)
      .subscribe(() => {
        this.selectiveCoursesStudentDegrees[i].selectiveCourses[j] = this.newSelectiveCourseOnEdit;
        this.newSelectiveCourseOnEdit = false;
      });
    console.log('save');
  }

  cancelSubstituteCourse(i: number, j: number): void {
    this.getSelectiveCourse(i, j).isBeingEdited = false;
  }

  getAllSelectiveCoursesInSemester(selectiveCourse: SelectiveCourse, degreeId: number) {
    this.selectiveCourseService.getSelectiveCourses(""+selectiveCourse.studyYear, degreeId, selectiveCourse.course.semester)
      .subscribe((selectiveCourses: SelectiveCourse[]) => {
        this.allSelectiveCoursesInSemesters[selectiveCourse.course.semester] = selectiveCourses;
      });
  }

  getSelectiveCourse(i: number, j: number): any {
    return this.selectiveCoursesStudentDegrees[i].selectiveCourses[j] as any;
  }

  onNewSelectiveCourseSelect(event) {
    this.newSelectiveCourseOnEdit = event.item;
  }
}
