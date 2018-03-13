import {Component, OnInit, Input} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss']
})
export class AddedCoursesComponent implements OnInit {

  @Input() coursesForGroup: CourseForGroup[];
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;

  constructor() { }

  ngOnInit() {
  }

}
