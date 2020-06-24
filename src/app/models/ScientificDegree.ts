import {NameEntity} from './basemodels/NameEntity';
import {NameWithEngEntity} from "./basemodels/NameWithEngEntity";

export class ScientificDegree extends  NameWithEngEntity {
  constructor(id: number) {
    super();
    this.id = id || 0;
  }
}
