import {NameWithEngEntity} from './basemodels/NameWithEngEntity';

export class KnowledgeControl extends NameWithEngEntity {
  hasGrade: boolean;
  constructor(){
    super();
    this.name = '';
  }
}
