import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StudentGroup} from "../../../models/StudentGroup";
import {GroupService} from "../../../services/group.service";
import {CourseForGroup} from "../../../models/CourseForGroup";
import {Course} from "../../../models/Course";

@Component({
  selector: 'studied-courses',
  templateUrl: './studied-courses.component.html',
  styleUrls: ['./studied-courses.component.scss'],
  providers: [GroupService]
})
export class StudiedCoursesComponent implements OnInit {

  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[] = [];
  courses: CourseForGroup[];
  selectedCourses: CourseForGroup[];

  @Output() selectGroup = new EventEmitter();
  @Output() selectSemester = new EventEmitter();

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.getGroupsByFaculty().subscribe(groups => {
      this.groups = groups;
    })
  }

  changeSelectedCoursesList(checked: boolean, selectedCourse: CourseForGroup) {
    if (!checked){
      for (let course of this.selectedCourses){
        if (course.id === selectedCourse.id)
          this.selectedCourses.concat(course)
      }
    }
    else
      this.selectedCourses.push(selectedCourse)
  }

  changeSemesters(){
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++){
      this.semesters.push(i + 1);
    }
  }

}
