import {Course} from './Course';
import {Student} from './Student';

export class GradeRunner {
  student: Student;
  course: Course;

  constructor(student: Student, course: Course) {
    this.student = student;
    this.course = course;
  }
}
