import {Student} from './Student';
import {StudentGroup} from './StudentGroup';
import {BaseEntity} from './basemodels/BaseEntity';
import {Specialization} from './Specialization';

export class StudentDegree extends BaseEntity {
  student: Student;
  studentGroup?: StudentGroup;
  specialization?: Specialization;
  recordBookNumber?: string;
  studentCardNumber?: string;
  admissionOrderNumber?: string;
  admissionOrderDate?: Date;
  admissionDate: Date;
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
  previousDiplomaIssuedBy?: Date;
  payment?: string;
  active?: boolean;
  selected?: boolean;
}
