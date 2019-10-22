import {Course} from './Course';
import {Student} from './Student';

export class GradeRunners {
  student: Student;
  courses: Course[] = [];

  constructor(student: Student) {
    this.student = student;
  }

  addCourse(course: Course): void {
    const indexOfCourse = this
      .courses
      .findIndex(findCourse => findCourse.id === course.id && findCourse.semester === course.semester)
    ;

    if (indexOfCourse === -1) {
      this.courses.push(course);
    }
  }

  removeCourse(course: Course): void {
    const indexOfCourse = this
      .courses
      .findIndex(findCourse => findCourse.id === course.id && findCourse.semester === course.semester)
    ;

    if (indexOfCourse !== -1) {
      this.courses.splice(indexOfCourse, 1);
    }
  }

  countCourses(): number {
    return this.courses.length;
  }
}
