import {StudentGroup} from './StudentGroup';
import {Student} from './Student';
import {BaseEntity} from './basemodels/BaseEntity';

export class StudentDegree extends BaseEntity {
  student: Student;
  studentGroup: StudentGroup;
  payment?: string;
  recordBookNumber?: string;
  diplomaNumber?: number;
  supplementNumber?: number;
  thesisName?: string;
  thesisNameEng?: string;
  protocolNumber?: number;
  previousDiplomaNumber?: number;
  diplomaDate?: Date;
  supplementDate?: Date;
  protocolDate?: Date;
  previousDiplomaDate?: Date;
}
