import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StudentGroup} from "../../models/StudentGroup";
import {GroupService} from "../../services/group.service";
import {CourseService} from "../../services/course.service";
import {Course} from "../../models/Course";
import {CourseCreationComponent} from "../shared/courses-for/course-creation/course-creation.component";
import {StudentService} from "../../services/student.service";
import {StudentDegree} from "../../models/StudentDegree";
import {CourseForStudent} from "../../models/CourseForStudent";
import {CourseForStudentService} from "../../services/course-for-student.service";
import {CourseType} from "../../models/course-type.enum";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ConfirmSelectedComponent} from "./confirm-selected/confirm-selected.component";
import {DiplomaType} from "../../models/diploma-type.enum";

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
  courseType = CourseType;
  courseTypeKey: Array<string>;
  selectedCourseType: string;
  studiedCoursesLoading: boolean = false;
  @ViewChild(CourseCreationComponent, { static: false }) courseCreationChild: CourseCreationComponent;
  assignCoursesModalRef: BsModalRef;

  constructor(private groupService: GroupService, private courseService: CourseService,
          private studentService: StudentService, private courseForStudentService: CourseForStudentService,
          private modalService: BsModalService) { }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
    });
    this.courseTypeKey = Object.keys(CourseType);
  }

  changeSemesters() {
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

  addCoursesForStudents(template: TemplateRef<any>) {
    let selectedCourses = this.courses.filter(course => course.selected);
    let selectedCoursesWrite: CoursesForStudentWrite[] = selectedCourses.map(
      selectedCourse => new CoursesForStudentWrite(selectedCourse.id, null, CourseType.RECREDIT));
    let selectedStudents = this.students.filter(student => student.selected);
    this.assignCoursesModalRef = this.modalService.show(ConfirmSelectedComponent,
      {initialState: {selectedStudents: selectedStudents, selectedCourses: this.selectedCourses, courseType: this.selectedCourseType},
        class: 'modal-custom'});
    // selectedStudents.forEach(student => {
    //   this.courseForStudentService.createCoursesForStudent(student.id, selectedCoursesWrite).subscribe(result => {
    //     console.log(result);
    //   });
    // });

  }

  getCoursesByStudent() {

  }

  checkCourse(isChecked: boolean, course) {

  }

  changeTeacher(course) {

  }
}

class CoursesForStudentWrite {
  courseId: number;
  teacherId: number;
  courseType: CourseType;


  constructor(courseId: number, teacherId: number, courseType: CourseType) {
    this.courseId = courseId;
    this.teacherId = teacherId;
    this.courseType = courseType;
  }
}
