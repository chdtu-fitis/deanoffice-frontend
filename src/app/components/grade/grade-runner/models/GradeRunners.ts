import {Person} from '../../../../models/basemodels/Person';
import {NameEntity} from '../../../../models/basemodels/NameEntity';

export class GradeRunners {
  student: Person;
  courses: NameEntity[] = [];

  constructor(student: Person) {
    this.student = student;
  }

  addCourse(course: NameEntity): void {
    const indexOfCourse = this.courses.findIndex(findCourse => findCourse.id === course.id);

    if (indexOfCourse === -1) {
      this.courses.push(course);
    }
  }

  removeCourse(course: NameEntity): void {
    const indexOfCourse = this.courses.findIndex(findCourse => findCourse.id === course.id);

    if (indexOfCourse !== -1) {
      this.courses.splice(indexOfCourse, 1);
    }
  }

  countCourses(): number {
    return this.courses.length;
  }
}
