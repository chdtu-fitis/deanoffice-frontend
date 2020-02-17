import {Component, OnInit, ViewChild} from '@angular/core';
import {GradeService} from '../../services/grade.service';
import {GroupService} from '../../services/group.service';
import {StudentGroup} from '../../models/StudentGroup';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {Grade} from '../../models/Grade';
import {StudentDegree} from '../../models/StudentDegree';
import {CourseForGroup} from '../../models/CourseForGroup';
import {StudentService} from '../../services/student.service';
import {PostGrade} from './models/PostGrade';
import {GradeUpdateAcademicDifference} from './models/GradeUpdateAcademicDifference';
import {GradeRunner} from './grade-runner/models/GradeRunner';
import {GradeRunners} from './grade-runner/models/GradeRunners';
import {Course} from './grade-runner/models/Course';
import {Student} from './grade-runner/models/Student';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
  providers: [GradeService, GroupService, StudentService, CourseForGroupService]
})
export class GradeComponent implements OnInit {
  @ViewChild('gradeTable', { static: false }) gradeTable;
  groups: StudentGroup[];
  selectGroup: StudentGroup;
  selectSemester = 1;
  coursesForGroup: CourseForGroup[] = [];
  coursesForGroupAll: CourseForGroup[] = [];
  studentsDegree: StudentDegree[] = [];
  studentsDegreeAll: StudentDegree[] = [];
  loading = false;
  errorMessages: string[] = [];
  emptyGradesList: Grade[] = [];

  gradesUpdate: Grade[] = [];
  isDeleteMode = false;
  selectGradeForDelete: Grade;
  defaultOnTime = true;

  gradeRunners: GradeRunners[] = [];
  isFocusedGrade: boolean;
  showAcademicDifference = true;
  isSortableCoursesForGroup = false;

  constructor(private gradeService: GradeService,
              private groupService: GroupService,
              private studentService: StudentService,
              private courseForGroupService: CourseForGroupService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

  changeMode() {
    this.isDeleteMode = !this.isDeleteMode;
  }

  setStudentGroup(group: StudentGroup): void {
    this.selectGroup = group;
    this.gradeTable.focusGrade = {} as Grade;
    this.gradeTable.resetGrades();
  }

  setSemester(selectSemester: number): void {
    this.selectSemester = selectSemester;
    this.gradeTable.focusGrade = {} as Grade;
  }

  getGrades(): void {
    this.resetSelectGradeForDelete();
    this.updateRequest(this.selectSemester || 1, this.selectGroup.id);
  }

  updateRequest(semester: number, groupId: number): void {
    this.loading = false;
    this.gradeService.getGradesByGroupIdAndBySemester(groupId, semester).subscribe((grades: Grade[]) => {
      this.studentService.getStudentsByGroupId(groupId).subscribe((studentsDegree: StudentDegree[]) => {
        this.courseForGroupService.getCoursesForGroupAndSemester(groupId, semester).subscribe((courseForGroups: CourseForGroup[]) => {
          this.updateGradesAndStudentsAndCourses(grades, studentsDegree, courseForGroups);
        });
      });
    });
  }

  updateGradesAndStudentsAndCourses(grades: Grade[], studentsDegree: StudentDegree[], coursesForGroup: CourseForGroup[]): void {
    this.checkForErrorsAfterQueryingDataFetches(coursesForGroup, studentsDegree, grades);
    const joinGrades = this.joinGradesForStudents(grades, studentsDegree, coursesForGroup);
    this.setCourses(coursesForGroup);
    this.setStudentDegree(joinGrades.studentsTemp || []);
    this.setEmptyGradesList(joinGrades.emptyGrades || []);
    this.clearUpdateGrades();
    this.loading = true;
  }

  joinGradesForStudents(grades: Grade[], studentsDegree: StudentDegree[], coursesForGroup: CourseForGroup[]): { studentsTemp: StudentDegree[], emptyGrades: Grade[] } {
    const studentsTemp = [];
    const emptyGrades = [];
    for (const studentDegree of studentsDegree) {
      const student = studentDegree;
      student.grades = [];
      for (const courseForGroup of coursesForGroup) {
        const grade = this.joinGrades(studentDegree, grades, courseForGroup);
        if (grade.empty) {
          emptyGrades.push(grade);
        }
        student.grades.push(grade);
      }
      studentsTemp.push(student);
    }
    return {studentsTemp, emptyGrades};
  }

  joinGrades(studentDegree: StudentDegree, grades: Grade[], courseForGroup: CourseForGroup): any {
    let check = false;
    for (const grade of grades) {
      if (studentDegree.id === grade.studentDegreeId && grade.courseId === courseForGroup.course.id) {
        check = true;
        if (!grade.points) {
          grade.points = null;
        }
        return grade;
      }
    }
    if (!check) {
      return new Grade(null, true, courseForGroup.course.id, courseForGroup.academicDifference, studentDegree.id, this.defaultOnTime);
    }
  }

  setStudentDegree(studentsDegree: StudentDegree[]): void {
    this.studentsDegreeAll = studentsDegree;
    this.updateFilteredStudentDegree();
  }

  updateFilteredStudentDegree(): void {
    const coursesIDs = this.coursesForGroup.map(courseForGroup => courseForGroup.course.id);

    this.studentsDegree = this.studentsDegreeAll.map(
      studentDegree => ({
        ...studentDegree,
        grades: studentDegree.grades.filter(grade => coursesIDs.includes(grade.courseId))
      })
    );
  }

  setEmptyGradesList(grades: Grade[]): void {
    this.emptyGradesList = grades;
  }

  setCourses(courseForGroup: CourseForGroup[]): void {
    this.coursesForGroupAll = courseForGroup;
    this.updateFilteredCourses();
  }

  updateFilteredCourses(): void {
    this.coursesForGroup = this.coursesForGroupAll.filter(course => !course.academicDifference || this.showAcademicDifference);
  }

  addErrorMessage(err, clear): void {
    if (clear) {
      this.errorMessages = [];
    }
    this.errorMessages.push(err);
  }

  checkForErrorsAfterQueryingDataFetches(coursesForGroup: CourseForGroup[], studentsDegree: StudentDegree[], grades: Grade[]): void {
    if (coursesForGroup.length && studentsDegree.length && grades.length) {
      this.errorMessages = [];
    } else {
      this.errorMessages = [];
      if (!coursesForGroup.length) {
        this.addErrorMessage('Немає предметів для обраної групи студентів, в даному семестрі.', false);
      }
      if (!grades.length) {
        this.addErrorMessage('Немає оцінок для обраної групи студентів, в даному семестрі.', false);
      }
      if (!studentsDegree.length) {
        this.addErrorMessage('Не знайдено студентів в обраній групі.', false);
      }
    }
  }

  setErrorsFromTable(error: string): void {
    error ? this.addErrorMessage(error, true) : this.errorMessages = [];
  }

  addGradesForUpdate(grades): void {
    this.gradesUpdate = grades;
  }

  clearUpdateGrades(): void {
    this.gradesUpdate = [];
  }

  updateGradesForGroup(): void {
    this.gradeService.updateGrades(this.fixEntytyGrades(this.gradesUpdate)).subscribe(() => {
      this.getGrades();
      this.gradeTable.resetGrades();
    });
  }

  fillInWithZerosGrades(): void {
    this.gradeService.updateGrades(this.fixEntytyGrades(this.emptyGradesList)).subscribe(() => {
      this.getGrades();
    });
  }

  setSelectGradeForDelete(grade: Grade): void {
    if (this.selectGradeForDelete && this.selectGradeForDelete.id === grade.id) {
      this.resetSelectGradeForDelete();
    } else {
      this.selectGradeForDelete = grade;
    }
  }

  resetSelectGradeForDelete(): void {
    this.gradeTable.resetSelectGradeForDelete();
    this.selectGradeForDelete = null;
  }

  deleteSelectedGrade(): void {
    if (this.isConfirmToDeleteGrade(this.selectGradeForDelete)) {
      this.gradeService.deleteGradeById(this.selectGradeForDelete.id).subscribe(() => {
        this.getGrades();
      });
    }
  }

  isConfirmToDeleteGrade(grade: Grade) {
    const studentDegree = this.studentsDegree.find(studentDegree => {
      return studentDegree.id === grade.studentDegreeId;
    });
    const courseForGroup = this.coursesForGroup.find(courseForGroup => {
      return courseForGroup.course.id === grade.courseId;
    });
    const default_message = 'Оцiнку не можна буде вiдновити!\nВи дiйсно хочете видалити оцiнку?';
    try {
      const message = `Видалення оцiнки для студента:`
        + ` ${studentDegree.student.surname} ${studentDegree.student.name[0]}.${studentDegree.student.patronimic[0]}.\n`
        + `Предмет: ${courseForGroup.course.courseName.name}\n`
        + `Оцiнка: ${grade.points ? grade.points : 'не виставлена.'}\n`;
      return confirm(message + default_message);
    } catch (e) {
      return confirm(default_message);
    }
  }

  fixEntytyGrades(grades) {
    if (!grades.length) {
      return [];
    }
    const tempGrades = [];
    for (const grade of grades) {
      tempGrades.push(new PostGrade(grade));
    }
    return tempGrades;
  }

  setAcademicDifference() {
    const newAcademicDifference = !this.gradeTable.focusGrade.academicDifference;
    const AD = new GradeUpdateAcademicDifference(newAcademicDifference, [this.gradeTable.focusGrade.id]);
    this.gradeService.putAcademicDifference(AD).subscribe(() =>
      this.gradeTable.focusGrade.academicDifference = newAcademicDifference
    );
  }

  setOnTime() {
    this.gradeTable.focusGrade.onTime = !this.gradeTable.focusGrade.onTime;
    this.gradeService.updateGrades([new PostGrade(this.gradeTable.focusGrade)]).subscribe(() => {
    });
  }

  setIsFocusGrade(isFocusedGrade: boolean): void {
    this.isFocusedGrade = isFocusedGrade;
  }

  addGradeRunner(): void {
    if (this.gradeTable.focusGrade === undefined || this.gradeTable.focusGrade.empty) {
      return;
    }

    const foundStudentDegree = this.studentsDegree[this.gradeTable.focusStudentId];

    if (foundStudentDegree === undefined) {
      return;
    }

    const course = this.coursesForGroup.find(courseForGroup => courseForGroup.course.id === this.gradeTable.focusGrade.courseId);
    const subject = new Course(course.course.id, course.course.courseName, Number(this.selectSemester));
    const student = new Student(foundStudentDegree.student, this.gradeTable.focusGrade.studentDegreeId);
    const gradeRunner = new GradeRunner(student, subject);

    let gradeRunners = this
      .gradeRunners
      .find(findGradeRunners => findGradeRunners.student.studentDegreeId === gradeRunner.student.studentDegreeId)
    ;

    if (gradeRunners === undefined) {
      gradeRunners = new GradeRunners(gradeRunner.student);

      this.gradeRunners.push(gradeRunners);
    }

    gradeRunners.addCourse(gradeRunner.course);

    this.setIsFocusGrade(false);
  }

  removeCourseFromGradeRunners(gradeRunner: GradeRunner): void {
    const gradeRunners = this
      .gradeRunners
      .find(findGradeRunners => findGradeRunners.student.studentDegreeId === gradeRunner.student.studentDegreeId)
    ;

    if (gradeRunners !== undefined) {
      gradeRunners.removeCourse(gradeRunner.course);

      if (gradeRunners.getCountCourses() === 0) {
        const indexOfGradeRunners = this
          .gradeRunners
          .findIndex(findGradeRunners => findGradeRunners.student.studentDegreeId === gradeRunner.student.studentDegreeId)
        ;

        this.gradeRunners.splice(indexOfGradeRunners, 1);
      }
    }
  }

  clearGradeRunner(): void {
    this.gradeRunners = [];
  }

  onShowAcademicDifference($event): void {
    this.showAcademicDifference = $event.target.checked;
    this.updateFilteredCourses();
    this.updateFilteredStudentDegree();
  }

  toggleSortableCoursesForGroup(): void {
    this.isSortableCoursesForGroup = !this.isSortableCoursesForGroup;
  }

  moveCourseForGroupLeft(fromCourseForGroupIndex: number): void {
    let toCourseForGroupIndex = fromCourseForGroupIndex - 1;

    if (toCourseForGroupIndex < 0) {
      toCourseForGroupIndex = 0;
    }

    this.swapCourseForGroupPosition(fromCourseForGroupIndex, toCourseForGroupIndex);
  }

  moveCourseForGroupRight(fromCourseForGroupIndex: number): void {
    let toCourseForGroupIndex = fromCourseForGroupIndex + 1;
    const coursesForGroupLength = this.coursesForGroup.length;

    if (toCourseForGroupIndex === coursesForGroupLength) {
      toCourseForGroupIndex = coursesForGroupLength - 1;
    }

    this.swapCourseForGroupPosition(fromCourseForGroupIndex, toCourseForGroupIndex);
  }

  swapCourseForGroupPosition(fromCourseForGroupIndex: number, toCourseForGroupIndex): void {
    const courseForGroup = this.coursesForGroup.splice(fromCourseForGroupIndex, 1);
    this.coursesForGroup.splice(toCourseForGroupIndex, 0, courseForGroup[0]);

    this.studentsDegree = this.studentsDegree.map(studentDegree => {
        const grade = studentDegree.grades.splice(fromCourseForGroupIndex, 1);
        studentDegree.grades.splice(toCourseForGroupIndex, 0, grade[0]);

        return studentDegree;
      }
    );
  }
}
