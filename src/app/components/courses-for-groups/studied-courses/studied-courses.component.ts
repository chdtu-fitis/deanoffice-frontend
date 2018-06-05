import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupService} from "../../../services/group.service";
import {Course} from "../../../models/Course";
import {CourseForGroupService} from "../../../services/course-for-group.service";

@Component({
  selector: 'studied-courses',
  templateUrl: './studied-courses.component.html',
  styleUrls: ['./studied-courses.component.scss'],
  providers: [GroupService, CourseForGroupService]
})
export class StudiedCoursesComponent implements OnInit {
  @Input() courses: Course[] = [];
  @Input() searchText: string;
  selectedCourses: Course[] = [];
  @Output() onSelectedCoursesChange = new EventEmitter();
  @Input() loading: boolean;

  constructor() {
  }

  ngOnInit() {}

  changeSelectedCoursesList(checked: boolean, selectedCourse: Course) {
    if (!checked) {
      for (let course of this.selectedCourses)
        if (course.id === selectedCourse.id) {
          this.selectedCourses.splice(this.selectedCourses.indexOf(course), 1);
        }
    }
    else {
      this.selectedCourses.push(selectedCourse)
    }
    this.onSelectedCoursesChange.emit(this.selectedCourses);
  }
}
