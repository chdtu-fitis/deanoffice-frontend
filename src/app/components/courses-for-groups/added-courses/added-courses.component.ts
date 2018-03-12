import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {Course} from '../../../models/Course';
import {Teacher} from "../../../models/Teacher";


@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss']
})
export class AddedCoursesComponent implements OnInit {

  courses: Course[];
  studentGroup: StudentGroup;
  teacher: Teacher;
  examDate: Date;

  constructor() { }

  ngOnInit() {
  }

}
