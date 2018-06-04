import {BaseEntity} from './basemodels/BaseEntity';

export class AcquiredCompetencies extends BaseEntity{
  competencies;
  competenciesEng;

  constructor() {
    super();
    this.competencies = '';
    this.competenciesEng = '';
  }
}
