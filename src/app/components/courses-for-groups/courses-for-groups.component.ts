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
  coursesForDelete: CourseForGroup[] = [];
  updatedCourses: CourseForGroup[] = [];
  selectedCourses: Course[];
  searchText = '';
  coursesForGroup: CourseForGroup[] = [];
  deleteCoursesIds: number[] = [];
  @ViewChild(AddedCoursesComponent) child: AddedCoursesComponent;
  studiedCoursesLoading = false;
  showPage = false;

  constructor(private courseService: CourseService, private courseForGroupService: CourseForGroupService, private groupService: GroupService) {}

  ngOnInit() {
    this.groupService.getGroupsByFaculty().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
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
    setTimeout(() => {
      this.child.getCoursesForGroup();
    }, 0);
    this.cancelChanges();
  }

  onSemesterChange(){
    this.studiedCoursesLoading = true;
    if (this.selectedSemester) {
      this.courseService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
    setTimeout(() => {
      this.child.getCoursesForGroup();
    }, 0);
  }

  private addSelectedCoursesToCoursesForAdd () {
    this.coursesForAdd = [];
    for (let course of this.selectedCourses){
      let courseForGroup = new CourseForGroup();
      courseForGroup.course = course;
      courseForGroup.studentGroup = this.selectedGroup;
      this.coursesForAdd.push(courseForGroup);
    }
  }

  changeCoursesForGroup(event){
    for(let i = 0; i<event.length; i++){
      this.coursesForGroup.push(event[i])
    }
  }

  changeCoursesForDelete(event) {
    this.coursesForDelete = event;
  }

  deleteCoursesFromCoursesForGroups(){
    console.log(this.coursesForDelete);
    for (let deletedCourse of this.coursesForDelete){
      for (let course of this.coursesForGroup){
        if (deletedCourse.id==course.id && deletedCourse.id!=undefined){
          this.coursesForGroup.splice(this.coursesForGroup.indexOf(course),1);
          this.deleteCoursesIds.push(deletedCourse.id);
          this.child.coursesForGroup.splice(this.child.coursesForGroup.indexOf(course), 1);
        }
        for (let addedCourse of this.coursesForAdd)
          if (addedCourse.course.id === deletedCourse.course.id){
            this.coursesForGroup.splice(this.coursesForGroup.indexOf(course),1);
            this.coursesForAdd.splice(this.coursesForAdd.indexOf(addedCourse), 1);
            this.child.coursesForGroup.splice(this.child.coursesForGroup.indexOf(addedCourse), 1);
          }
      }
    }
    console.log(this.deleteCoursesIds);
  }

  changeSelectedCourses(event) {
    this.selectedCourses = event;
    this.addSelectedCoursesToCoursesForAdd();
  }

  addCoursesToCoursesForGroup() {
    for (let courseForAdd of this.coursesForAdd){
      this.coursesForGroup.push(courseForAdd);
    }
    setTimeout(() => {
      this.child.addNewCoursesForGroup();
    }, 0);
  }

  saveCoursesForGroup() {
    class courseForGroupNewCoursesType {course: {id: number}; teacher: {id: number}; dateOfExam: Date}
    class courseForGroupUpdateCoursesType {id: number; course: {id: number}; teacher: {id: number}; dateOfExam: Date}
    let newCourses: courseForGroupNewCoursesType[] = [];
    let updatedCourses: courseForGroupUpdateCoursesType[] = [];
    for (let newCourse of this.coursesForAdd){
      newCourses.push({course: {id: newCourse.course.id}, teacher: {id: newCourse.teacher.id}, dateOfExam: newCourse.examDate})
    }
    for (let updateCourse of this.updatedCourses){
      updatedCourses.push({id: updateCourse.id, course: {id: updateCourse.course.id}, teacher: {id: updateCourse.teacher.id}, dateOfExam: updateCourse.examDate})
    }
    this.courseForGroupService.createCoursesForGroup(this.selectedGroup.id, {
      newCourses: newCourses,
      updatedCourses: updatedCourses,
      deleteCoursesIds: this.deleteCoursesIds
    }).subscribe(() => {
    });
    this.onSemesterChange();
  }

  cancelChanges(){
    this.coursesForDelete = [];
    this.child.coursesForGroupForDelete = [];
    this.deleteCoursesIds = [];
    this.coursesForAdd = [];
    this.updatedCourses = [];
    this.onSemesterChange();
  }

}
