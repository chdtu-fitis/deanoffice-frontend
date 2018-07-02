import {BaseEntity} from '../../../../models/basemodels/BaseEntity';
import {ProfessionalQualification} from './professional-qualification';

export class QualificationForSpecialization extends BaseEntity {
  professionalQualification: ProfessionalQualification;
  year: number;
}

export class QualificationForSpecializationId extends BaseEntity {
  professionalQualificationId: number;
}
