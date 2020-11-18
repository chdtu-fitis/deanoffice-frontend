import {NameWithEngAndActiveEntity} from './basemodels/NameWithEngAndActiveEntity';
import {Speciality} from './Speciality';
import {Degree} from './Degree';
import {Department} from './Department';
import {Teacher} from './Teacher';
import {Faculty} from './Faculty';

export class Specialization extends NameWithEngAndActiveEntity {
  speciality: Speciality;
  code: string;
  degree: Degree;
  department?: Department;
  programHead?: Teacher;
  qualification?: string;
  qualificationEng?: string;
  paymentFulltime?: number;
  paymentExtramural?: number;
  educationalProgramHeadName: string;
  educationalProgramHeadNameEng: string;
  educationalProgramHeadInfo: string;
  educationalProgramHeadInfoEng: string;
  certificateNumber: string;
  certificateDate: Date;

  specialityId?: number;
  degreeId?: number;
  departmentId?: number;

  faculty: Faculty;

  constructor() {
    super();
  }
}
