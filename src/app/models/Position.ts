import {NameEntity} from './basemodels/NameEntity';

export class Position extends NameEntity {
  constructor(id: number) {
    super();
    this.id = id || 0;
  }
}
