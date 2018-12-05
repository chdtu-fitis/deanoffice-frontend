import { Student } from './Student';
import { StudentGroup } from './StudentGroup';
import { BaseEntity } from './basemodels/BaseEntity';
import { Specialization } from './Specialization';
import { DiplomaType } from './diploma-type.enum';
import { StudentPreviousUniversity } from './StudentPreviousUniversity';

export class StudentDegree extends BaseEntity {
  student: Student;
  studentGroup?: StudentGroup;
  specialization?: Specialization;
  recordBookNumber?: string;
  studentCardNumber?: string;
  admissionOrderNumber?: string;
  admissionOrderDate?: Date;
  admissionDate: Date;
  studentPreviousUniversities: StudentPreviousUniversity[];
  contractNumber?: string;
  contractDate?: Date;
  diplomaNumber?: string;
  diplomaDate?: Date;
  diplomaWithHonours?: boolean;
  supplementNumber?: string;
  supplementDate?: Date;
  thesisName?: string;
  thesisNameEng?: string;
  protocolNumber?: string;
  protocolDate?: Date;
  previousDiplomaType?: DiplomaType;
  previousDiplomaNumber?: string;
  previousDiplomaDate?: Date;
  previousDiplomaIssuedBy?: string;
  previousDiplomaIssuedByEng?: string;
  payment?: string;
  active?: boolean;
  selected?: boolean;
}
