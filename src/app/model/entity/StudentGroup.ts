import {NameWithActiveEntity} from "./superclasses/NameWithActiveEntity";
import {Specialization} from "./Specialization";
export class StudentGroup extends NameWithActiveEntity{
  specialization: Specialization;
  creationYear: number;
  tuitionForm: string;
  tuitionTerm: string;
  studySemesters: number;
  studyYears: number;
  beginYears: number;

  constructor(){
    super();
    this.tuitionForm = 't'; // f - fulltime, e - extramural
    this.tuitionTerm = 't'; // r - regular, s - shortened
  }
}
