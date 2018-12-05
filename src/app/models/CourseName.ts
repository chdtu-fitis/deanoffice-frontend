import { NameWithEngEntity } from './basemodels/NameWithEngEntity';

export class CourseName extends NameWithEngEntity {
  abbreviation: string;

  constructor(){
    super();
    this.name = '';
    this.nameEng = '';
    this.abbreviation = '';
  }
}
