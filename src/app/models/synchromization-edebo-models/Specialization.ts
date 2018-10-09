import {NameWithEngAndActiveEntity} from '../basemodels/NameWithEngAndActiveEntity';
import {Faculty} from './Faculty';
import {Degree} from './Degree';
import {SpecialityBasics} from './SpecialityBasics';

export class Specialization extends NameWithEngAndActiveEntity {
  id: number;
  name: string;
  faculty: Faculty;
  degree: Degree;
  speciality: SpecialityBasics;
}
