
import { SpecialityBasics } from './SpecialityBasics';
import { Named } from './Named';

export class Specialization{
  id: number;
  name: string;
  faculty: Named;
  degree: Named;
  speciality: SpecialityBasics;
}
