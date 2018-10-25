import {BaseEntity} from './basemodels/BaseEntity';

export class StudentPreviousUniversity extends BaseEntity {
  universityName: string;
  studyStartDate: Date;
  studyEndDate: Date;
  academicCertificateNumber: string;
  academicCertificateDate: Date;
}
