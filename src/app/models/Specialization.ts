import {NameWithEngAndActiveEntity} from './basemodels/NameWithEngAndActiveEntity';
import {Speciality} from './Speciality';
import {Degree} from './Degree';
import {Department} from './Department';

export class Specialization extends NameWithEngAndActiveEntity {
  speciality: Speciality;
  degree: Degree;
  department?: Department;
  qualification?: string;
  qualificationEng?: string;
  paymentFulltime?: number;
  paymentExtramural?: number;
  educationalProgramHeadName: string;
  educationalProgramHeadNameEng: string;
  educationalProgramHeadInfo: string;
  educationalProgramHeadInfoEng: string;
  knowledgeAndUnderstandingOutcomes?: string;
  knowledgeAndUnderstandingOutcomesEng?: string;
  applyingKnowledgeAndUnderstandingOutcomes?: string;
  applyingKnowledgeAndUnderstandingOutcomesEng?: string;
  makingJudgementsOutcomes?: string;
  makingJudgementsOutcomesEng?: string;

  specialityId?: number;
  degreeId?: number;
  departmentId?: number;
  constructor() {
    super();
  }
}
