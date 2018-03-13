import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[] = [];
  courses: CourseForGroup[];

  @Output() selectGroup = new EventEmitter();
  @Output() selectSemester = new EventEmitter();
  @Output() selectedCourses: CourseForGroup[];

  constructor(private groupService: GroupService, private courseForGroupService: CourseForGroupService) {
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

  private changeSemesters() {
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++){
      this.semesters.push(i + 1);
    }
  }

  onGroupChange() {
    this.changeSemesters();
    this.onSemesterChange();
  }

  onSemesterChange() {
    if (this.selectedSemester) {
      this.courseForGroupService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
      })
    }
  }
}
