import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {CourseForGroup} from '../../models/CourseForGroup';
import {AddedCoursesComponent} from "./added-courses/added-courses.component";

@Component({
  selector: 'courses-for-groups',
  templateUrl: './courses-for-groups.component.html',
  styleUrls: ['./courses-for-groups.component.scss']
})
export class CoursesForGroupsComponent implements OnInit {
  @ViewChild(AddedCoursesComponent) addedCoursesComponent: AddedCoursesComponent
  selectedSemester: number;
  selectedGroup: StudentGroup;
  coursesForGroup: CourseForGroup[];

  constructor() {
  }

  ngOnInit() {
  }

  changeGroup(event) {
    this.selectedGroup = event;
    this.addedCoursesComponent.onGroupChange();
  }

  changeSemester(event) {
    this.selectedSemester = event;
    this.addedCoursesComponent.onSemesterChange();
  }

  changeCoursesForGroup(event) {
    this.coursesForGroup = event;
    this.addedCoursesComponent.onCoursesForGroupChange();
  }

}
