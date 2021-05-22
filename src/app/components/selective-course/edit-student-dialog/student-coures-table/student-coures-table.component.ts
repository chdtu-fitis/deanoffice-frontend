import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesStudentDegree} from '../../../../models/SelectiveCoursesStudentDegree';

@Component({
  selector: 'student-coures-table',
  templateUrl: './student-coures-table.component.html',
  styleUrls: ['./student-coures-table.component.scss']
})
export class StudentCouresTableComponent implements OnInit {

  @Input() selectiveCoursesStudentDegree: SelectiveCoursesStudentDegree[];
  constructor() { }

  ngOnInit() {
  }

}
