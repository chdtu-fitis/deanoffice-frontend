import {NameWithEngAndActiveEntity} from "./superclasses/NameWithEngAndActiveEntity";
import {Speciality} from "./Speciality";
import {Degree} from "./Degree";
import {Faculty} from "./Faculty";
import {Department} from "./Department";
export class Specialization extends NameWithEngAndActiveEntity{
  speciality: Speciality;
  degree: Degree;
  faculty: Faculty;
  department: Department;
  qualification: string;
  qualificationEng: string;
  paymentFullTime: number;
  paymentExtramural: string;
}
