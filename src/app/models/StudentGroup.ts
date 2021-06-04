import {NameWithActiveEntity} from './basemodels/NameWithActiveEntity';
import {Specialization} from './Specialization';
import {StudentDegree} from './StudentDegree';
import {TuitionForm} from './tuition-form.enum';
import {TuitionTerm} from './tuition-term.enum';

export class StudentGroup extends NameWithActiveEntity {
  specialization: Specialization;
  creationYear: number;
  tuitionForm: TuitionForm | TuitionForm.FULL_TIME;
  tuitionTerm: TuitionTerm | TuitionTerm.REGULAR;
  studySemesters: number;
  studyYears: number;
  beginYears: number;
  realBeginYear: number;
  studentDegrees: StudentDegree[];
  selected?: boolean;

  constructor() {
    super();
  }
}
