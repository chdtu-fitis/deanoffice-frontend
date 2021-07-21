import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesStudentDegree} from '../../../../models/SelectiveCoursesStudentDegree';
import {TypeCycle} from '../../../../models/TypeCycle';

@Component({
  selector: 'student-coures-table',
  templateUrl: './student-courses-table.component.html',
  styleUrls: ['./student-courses-table.component.scss']
})
export class StudentCoursesTableComponent implements OnInit {

  @Input() selectiveCoursesStudentDegrees: SelectiveCoursesStudentDegree[];
  typeCycle = TypeCycle;
  isBeingEdited: boolean[] = [];
  searchText: string;

  constructor() {
  }

  ngOnInit() {
    for (let selectiveCoursesStudentDegree of this.selectiveCoursesStudentDegrees) {
      this.isBeingEdited.push(false);
    }
  }

  substituteCourse(i: number): void {
    this.isBeingEdited[i] = true;
    console.log(this.isBeingEdited);
  }

  saveSubstituteCourse(i: number): void {
    console.log('save');
  }

  cancelSubstituteCourse(i: number): void {
    this.isBeingEdited[i] = false;
  }
}
