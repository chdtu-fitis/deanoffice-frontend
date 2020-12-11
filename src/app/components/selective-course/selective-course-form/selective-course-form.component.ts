import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Department} from '../../../models/Department';
import {TeacherSearchComponent} from '../teacher-search/teacher-search.component';
import {Course} from '../../../models/Course';

@Component({
  selector: 'selective-course-form',
  templateUrl: './selective-course-form.component.html',
  styleUrls: ['./selective-course-form.component.scss']
})
export class SelectiveCourseFormComponent implements OnInit {
  @Input() course: Course;
  @Input() departments: Department[];

  @ViewChild('teacher', {static: true}) teacher: TeacherSearchComponent;
  departmentId: number;
  description: string;
  groupName: string;

  constructor() {
  }

  ngOnInit() {
  }
}
