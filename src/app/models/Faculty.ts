import {NameWithEngAndActiveEntity} from './basemodels/NameWithEngAndActiveEntity';

export class Faculty extends NameWithEngAndActiveEntity {
  abbr: string;
  dean?: string;
  deanEng: string;
}
