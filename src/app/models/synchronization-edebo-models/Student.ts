import {Person} from '../basemodels/Person';

export class  Student extends Person {
  nameEng: string;
  surnameEng?: string;
  patronimicEng?: string;
  sex: string;
  birthDate: Date;
}
