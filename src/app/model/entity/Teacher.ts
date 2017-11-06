import {Person} from "./superclasses/Person";
import {Department} from "./Department";
export class Teacher extends Person{
  department: Department;
  position: Position;
  scientificDegree: string;
}
