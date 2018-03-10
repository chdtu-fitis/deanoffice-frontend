import {NameWithActiveEntity} from './basemodels/NameWithActiveEntity';
import {Specialization} from './Specialization';
import {StudentDegree} from "./StudentDegree";

export class StudentGroup extends NameWithActiveEntity {
  specialization: Specialization;
  creationYear: number;
  tuitionForm: string;
  tuitionTerm: string;
  studySemesters: number;
  studyYears: number;
  beginYears: number;
  studentDegrees: StudentDegree[];

  constructor() {
    super();
    this.tuitionForm = 't'; // f - fulltime, e - extramural
    this.tuitionTerm = 'r'; // r - regular, s - shortened
  }
}
