import {Course} from './Course';
import {Student} from './Student';

export class GradeRunners {
  courses: Course[] = [];

  constructor(public student: Student) {}

  addCourse(course: Course): void {
    const foundCourse = this
      .courses
      .find(coursesItem => coursesItem.isEqual(course))
    ;

    if (foundCourse) {
      return;
    }

    this.courses.push(course);
  }

  removeCourse(course: Course): void {
    const indexOfCourse = this
      .courses
      .findIndex(coursesItem => coursesItem.isEqual(course))
    ;

    if (indexOfCourse !== -1) {
      this.courses.splice(indexOfCourse, 1);
    }
  }

  getCountCourses(): number {
    return this.courses.length;
  }
}
