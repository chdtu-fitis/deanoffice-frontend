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
  courses: Course[];
  selectedCourses: Course[];

  @Output() onGroupSelect = new EventEmitter();
  @Output() onSemesterSelect = new EventEmitter();
  @Output() onSelectedCoursesChange = new EventEmitter();

  constructor(private groupService: GroupService, private courseForGroupService: CourseForGroupService) {
  }

  ngOnInit() {
    this.groupService.getGroupsByFaculty().subscribe(groups => {
      this.groups = groups;
    })
  }

  changeSelectedCoursesList(checked: boolean, selectedCourse: Course) {
    if (!checked){
      for (let course of this.selectedCourses){
        if (course.id === selectedCourse.id){}
          this.selectedCourses.splice(course);
      }
    }
    else {
      this.selectedCourses.push(selectedCourse)
    }
    this.onSelectedCoursesChange.emit(this.selectedCourses);
  }

  private changeSemesters(){
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++){
      this.semesters.push(i + 1);
    }
  }

  onGroupChange(){
    this.changeSemesters();
    this.onGroupSelect.emit(this.selectedGroup);
  }

  onSemesterChange(){
    if (this.selectedSemester) {
      this.courseForGroupService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
      })
    }
    this.onSemesterSelect.emit(this.selectedSemester);
  }
}
