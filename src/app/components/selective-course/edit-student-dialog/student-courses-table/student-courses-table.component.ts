import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesStudentDegree} from '../../../../models/SelectiveCoursesStudentDegree';
import {TypeCycle} from '../../../../models/TypeCycle';

@Component({
  selector: 'student-coures-table',
  templateUrl: './student-courses-table.component.html',
  styleUrls: ['./student-courses-table.component.scss']
})
export class StudentCoursesTableComponent implements OnInit {

  @Input() selectiveCoursesStudentDegree: SelectiveCoursesStudentDegree[];
  typeCycle = TypeCycle;
  isEditing = false;
  searchText: string;

  constructor() {
  }

  ngOnInit() {
  }

  editCourse(): void {
    this.isEditing = true;
    console.log(this.isEditing);
  }

  saveChanges(): void {
    console.log('save');
  }

}
