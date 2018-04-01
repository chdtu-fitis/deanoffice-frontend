import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/Course';

@Component({
  selector: 'course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss']
})
export class CourseCreationComponent implements OnInit {
  course: Course;

  constructor() { }

  ngOnInit() {
  }

}
