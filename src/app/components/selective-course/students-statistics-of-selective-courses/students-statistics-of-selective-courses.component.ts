import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {StudentDegree} from '../../../models/StudentDegree';

@Component({
  selector: 'students-statistics-of-selective-courses',
  templateUrl: './students-statistics-of-selective-courses.component.html',
  styleUrls: ['./students-statistics-of-selective-courses.component.scss']
})
export class StudentsStatisticsOfSelectiveCoursesComponent implements OnInit {
  students: StudentDegree[];
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
