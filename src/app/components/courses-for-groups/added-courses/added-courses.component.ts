import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentGroup} from '../../../models/StudentGroup';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {Course} from "../../../models/Course";

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss'],
  providers: [CourseForGroupService]
})
export class AddedCoursesComponent implements OnInit {

  coursesForGroup: CourseForGroup[] = [];
  coursesForGroupForDelete: CourseForGroup[] = [];
  addedCoursesForGroup: CourseForGroup[] = [];
  @Input() selectedCoursesForGroups: CourseForGroup[];
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;
  @Output() onCoursesForDeleteChange = new EventEmitter();
  @Output() onCoursesForGroup = new EventEmitter();
  @Output() onAddedCoursesForGroup = new EventEmitter();

  constructor(private courseForGroupService: CourseForGroupService) { }

  ngOnInit() {}

  getCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.selectedGroup.id, this.selectedSemester).subscribe(courses => {
      this.coursesForGroup = courses;
      this.onCoursesForGroup.emit(this.coursesForGroup);
    });
  }

  addNewCoursesForGroup(){
    for (let courseForGroup of this.selectedCoursesForGroups) {
      this.coursesForGroup.push(courseForGroup);
      this.addedCoursesForGroup.push(courseForGroup);
    }
  }

  changeCoursesForDelete(checked: boolean, selectedCourse: CourseForGroup){
    if (!checked) {
      for (let course of this.coursesForGroupForDelete)
        if (course.id === selectedCourse.id) {
          this.coursesForGroupForDelete.splice(this.coursesForGroupForDelete.indexOf(course), 1);
        }
    }
    else {
      this.coursesForGroupForDelete.push(selectedCourse);
    }
    this.onCoursesForDeleteChange.emit(this.coursesForGroupForDelete);
  }

  changeAddedCourses(){
    this.onAddedCoursesForGroup.emit(this.addedCoursesForGroup);
  }

  deleteFromCoursesForGroup() {
    for (let course of this.coursesForGroup){
      for (let deletedCourse of this.coursesForGroupForDelete){
        if (deletedCourse.id === course.id) {
          this.coursesForGroup.splice(this.coursesForGroup.indexOf(course), 1);
        }
      }
    }
  }
}
