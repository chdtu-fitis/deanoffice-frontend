import {BaseEntity} from '../../../../models/basemodels/BaseEntity';

export class AcquiredCompetencies extends BaseEntity {
  competencies;
  competenciesEng;
  specializationId: number;

  constructor() {
    super();
    this.competencies = '';
    this.competenciesEng = '';
  }
}
