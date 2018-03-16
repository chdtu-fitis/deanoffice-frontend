import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StudentGroup} from "../../../models/StudentGroup";
import {GroupService} from "../../../services/group.service";
import {CourseForGroup} from "../../../models/CourseForGroup";
import {Course} from "../../../models/Course";
import {CourseForGroupService} from "../../../services/course-for-group.service";

@Component({
  selector: 'studied-courses',
  templateUrl: './studied-courses.component.html',
  styleUrls: ['./studied-courses.component.scss'],
  providers: [GroupService, CourseForGroupService]
})
export class StudiedCoursesComponent implements OnInit {
  @Input() courses: Course[];
  selectedCourses: Course[];
  @Output() onSelectedCoursesChange = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  changeSelectedCoursesList(checked: boolean, selectedCourse: Course, index: number) {
    if (!checked){
      for (let course of this.selectedCourses){
        if (course.id === selectedCourse.id){}
          this.selectedCourses.splice(index);
      }
    }
    else {
      this.selectedCourses.push(selectedCourse)
    }
    this.onSelectedCoursesChange.emit(this.selectedCourses);
  }

}
