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

  private addSelectedCoursesToCoursesForGroup () {
    this.coursesForGroup = [];
    for (let course of this.selectedCourses){
      let courseForGroup = new CourseForGroup();
      courseForGroup.course = course;
      this.coursesForGroup.push(courseForGroup);
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
    for (let course of this.coursesForGroup){
      if (this.coursesForGroup.length>0)
        for (let courseForDelete of this.coursesForDelete){
          if (this.addedCourses.length>0)
            for (let addedCourse of this.addedCourses){
              if (course.id === courseForDelete.id&&addedCourse.id!=courseForDelete.id){
                this.deleteCoursesIds.push(course.id);
                this.coursesForGroup.splice(this.coursesForGroup.indexOf(course), 1);
              }
              else {
                this.addedCourses.splice(this.coursesForGroup.indexOf(course), 1);
              }
            }
          else if (course.id === courseForDelete.id){
            this.deleteCoursesIds.push(course.id);
            this.coursesForGroup.splice(this.coursesForGroup.indexOf(course), 1);
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

  saveCoursesForGroup() {
    let newCourses = [];
    let updatedCourses = [];
    for (let newCourse of this.addedCourses){
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
    console.log(this.addedCourses, this.updatedCourses, this.deleteCoursesIds);
    this.onSemesterChange();
  }

  cancelChanges(){
    this.deleteCoursesIds = [];
    this.addedCourses = [];
    this.updatedCourses = [];
    this.onSemesterChange();
  }

}
