import {NameWithActiveEntity} from './basemodels/NameWithActiveEntity';
import {Faculty} from './Faculty';

export class Department extends NameWithActiveEntity {
  abbr: string;
  faculty: Faculty;

  constructor(id: number) {
    super();
    this.id = id || 0;
  }
}
