import {Person} from '../../../../models/basemodels/Person';
import {NameEntity} from '../../../../models/basemodels/NameEntity';

export class GradeRunner {
  student: Person;
  course: NameEntity;

  constructor(student: Person, course: NameEntity) {
    this.student = student;
    this.course = course;
  }
}
