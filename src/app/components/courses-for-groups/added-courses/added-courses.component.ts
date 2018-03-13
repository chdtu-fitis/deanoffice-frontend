import {Component, OnInit, Input} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss']
})
export class AddedCoursesComponent implements OnInit {

  @Input() coursesForGroup: CourseForGroup[];

  constructor() { }

  ngOnInit() {
  }

}
