import {Person} from '../../../../models/basemodels/Person';

export class Student {
  person: Person;
  studentDegreeId: number;

  constructor(person: Person, studentDegreeId: number) {
    this.person = person;
    this.studentDegreeId = studentDegreeId;
  }
}
