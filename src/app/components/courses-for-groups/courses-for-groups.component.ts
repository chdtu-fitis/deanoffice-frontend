import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {Course} from "../../models/Course";
import {GroupService} from "../../services/group.service";
import {CourseService} from "../../services/course.service";
import {CourseForGroup} from "../../models/CourseForGroup";
import {AddedCoursesComponent} from "./added-courses/added-courses.component";
import {CourseForGroupService} from "../../services/course-for-group.service";

@Component({
  selector: 'courses-for-groups',
  templateUrl: './courses-for-groups.component.html',
  styleUrls: ['./courses-for-groups.component.scss'],
  providers: [CourseService, GroupService]
})
export class CoursesForGroupsComponent implements OnInit {
  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[] = [];
  courses: Course[];
  coursesForAdd: CourseForGroup[] = [];
  addedCourses: CourseForGroup[] = [];
  coursesForDelete: CourseForGroup[] = [];
  mutableCourses: CourseForGroup[] = [];
  selectedCourses: Course[];
  searchText = '';
  coursesForGroup: CourseForGroup[] = [];
  deleteCoursesIdList: String[] = [];
  @ViewChild(AddedCoursesComponent) child: AddedCoursesComponent;

  constructor(private courseService: CourseService, private courseForGroupService: CourseForGroupService, private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.getGroupsByFaculty().subscribe(groups => {
      this.groups = groups;
    })
  }

  private changeSemesters() {
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++) {
      this.semesters.push(i + 1);
    }
  }

  onGroupChange(){
    this.changeSemesters();
  }

  onSemesterChange(){
    if (this.selectedSemester) {
      this.courseService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
      })
    }
    console.log(this.child.selectedSemester);
    this.child.getCoursesForGroup();
  }

  private addSelectedCoursesToCoursesForGroup () {
    this.coursesForGroup = [];
    for (let course of this.selectedCourses){
      let courseForGroup = new CourseForGroup();
      courseForGroup.course = course;
      this.coursesForGroup.push(courseForGroup);
    }
  }

  changeCoursesForDelete(event) {
    this.coursesForDelete = event;
  }

  deleteCoursesFromCoursesForGroups(){
    for (let course of this.coursesForGroup){
      for (let courseForDelete of this.coursesForDelete){
        for (let addedCourse of this.addedCourses){
          if (course.id === courseForDelete.id&&addedCourse.id!=courseForDelete.id){
            this.coursesForGroup.splice(this.coursesForGroup.indexOf(course), 1);
            this.deleteCoursesIdList.push(course.id.toString());
          }
          else {
            this.addedCourses.splice(this.coursesForGroup.indexOf(course), 1);
          }
        }
      }
    }
    this.child.deleteFromCoursesForGroup();
  }

  changeSelectedCourses(event) {
    this.selectedCourses = event;
    this.addSelectedCoursesToCoursesForGroup();
  }

  changeAddedCourses(event) {
    this.addedCourses = event;
  }

  addCoursesToCoursesForGroup() {
    this.coursesForAdd = this.coursesForGroup;
    setTimeout(() => {
      this.child.addNewCoursesForGroup();
    }, 0);
  }

  createCoursesForGroup() {
    this.courseForGroupService.createCoursesForGroup(this.selectedGroup.id, {
      newCourses: this.addedCourses,
      mutableCourses: this.mutableCourses,
      deleteCoursesIdList: this.deleteCoursesIdList
    }).subscribe(() => {
    });
    this.onSemesterChange();
  }
}
