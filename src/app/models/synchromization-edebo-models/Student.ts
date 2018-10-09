import {Person} from '../basemodels/Person';

export class  Student extends Person {
  name: string;
  surname: string;
  patronimic: string;
  nameEng: string;
  surnameEng: string;
  patronimicEng: string;
  sex: string;
  birthDate: Date;
}
