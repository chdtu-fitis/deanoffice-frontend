import {NameWithEngEntity} from './basemodels/NameWithEngEntity';
import {NameWithEngAndActiveEntity} from './basemodels/NameWithEngAndActiveEntity';

export class OrderReason extends NameWithEngAndActiveEntity {
  kind: string;
}
