import { BaseEntity } from './basemodels/BaseEntity';

export class StudentPreviousUniversity extends BaseEntity {
  universityName: string;
  studyStartDate: Date;
  studyEndDate: Date;
  academicCertificateNumber?: string;
  academicCertificateDate?: Date;

  constructor() {
    super();
    this.universityName = '';
    this.studyStartDate = null;
    this.studyEndDate = null;
    this.academicCertificateNumber = '';
    this.academicCertificateDate = null;
  }

}
