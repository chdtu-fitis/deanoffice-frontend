import {NameEntity} from './basemodels/NameEntity';

export class ScientificDegree extends  NameEntity {
  constructor(id: number) {
    super();
    this.id = id || 0;
  }
}
