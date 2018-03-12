import {Student} from './Student';
import {StudentGroup} from './StudentGroup';
import {Degree} from './Degree';
import {BaseEntity} from './basemodels/BaseEntity';

export class StudentDegree extends BaseEntity {
  student: Student;
  studentGroup: StudentGroup;
  degree?: Degree;
  recordBookNumber?: string;
  admissionOrderNumber?: string;
  admissionOrderDate?: Date;
  contractNumber?: string;
  contractDate?: Date;
  diplomaNumber?: string;
  diplomaDate?: Date;
  supplementNumber?: string;
  supplementDate?: Date;
  thesisName?: string;
  thesisNameEng?: string;
  protocolNumber?: string;
  protocolDate?: Date;
  previousDiplomaType?: string;
  previousDiplomaNumber?: string;
  previousDiplomaDate?: Date;
  payment?: string;
  active?: boolean;
  selected?: boolean;
}
