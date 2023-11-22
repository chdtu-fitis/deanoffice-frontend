import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentGroup} from "../../models/StudentGroup";
import {GroupService} from "../../services/group.service";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/Course";
import {CourseCreationComponent} from "../shared/courses-for/course-creation/course-creation.component";
import {StudentService} from "../../services/student.service";
import {StudentDegree} from "../../models/StudentDegree";
import {CourseForStudent} from "../../models/CourseForStudent";

@Component({
  selector: 'courses-for-students',
  templateUrl: './courses-for-students.component.html',
  styleUrls: ['./courses-for-students.component.scss']
})
export class CoursesForStudentsComponent implements OnInit {
  HOURS_PER_CREDIT = 30;
  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  courses: Course[];
  selectedCourses: Course[] = [];
  students: StudentDegree[];
  coursesForStudent: CourseForStudent[] = [];
  showPage = false;
  searchText = '';
  semesters: number[] = [];
  studiedCoursesLoading: boolean = false;
  @ViewChild(CourseCreationComponent, { static: false }) courseCreationChild: CourseCreationComponent;

  constructor(private groupService: GroupService, private courseService: CourseService,
          private studentService: StudentService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
    });
  }

  private changeSemesters() {
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++) {
      this.semesters.push(i + this.selectedGroup.beginYears * 2 - 1);
    }
    if (!this.semesters.includes(this.selectedSemester)) {
      this.selectedSemester = this.semesters[0];
    }
  }

  onSemesterChange() {
    this.loadCoursesBySemester();
    // this.getCoursesForGroup();
    this.courseCreationChild.form.controls.semester.setValue(this.selectedSemester);
  }

  onGroupChange() {
    this.changeSemesters();
    // this.refresh();
    if (this.selectedSemester) {
      this.onSemesterChange();
    }
    this.studentService.getStudentsByGroupId(this.selectedGroup.id).subscribe(students => {
      this.students = students;
    })
  }

  loadCoursesBySemester() {
    this.studiedCoursesLoading = true;
    this.courseService.getCoursesBySemesterAndHoursPerCredit(this.selectedSemester, this.HOURS_PER_CREDIT).subscribe(cfg => {
      this.courses = cfg;
      this.studiedCoursesLoading = false;
    });
  }

  changeSelectedCourses(event) {
    this.selectedCourses = event;
  }

  onCourseCreation() {
    if (this.selectedSemester) {
      this.studiedCoursesLoading = true;
      this.courseService.getCoursesBySemesterAndHoursPerCredit(this.selectedSemester, this.HOURS_PER_CREDIT).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
  }

  addCoursesToCoursesForGroup() {

  }

  getCoursesByStudent() {

  }

  checkCourse(isChecked: boolean, course) {

  }

  changeTeacher(course) {

  }
}
