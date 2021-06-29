import {Person} from './basemodels/Person';
import {Department} from './Department';
import {Position} from './Position';
import {ScientificDegree} from "./ScientificDegree";
import {AcademicTitle} from "./academic-title.enum";

export class Teacher extends Person {
  department: Department;
  position: Position;
  sex: string;
  scientificDegree: ScientificDegree;
  academicTitle: AcademicTitle;
  positionId?: number;
  departmentId?: number;
  scientificDegreeId: number;
}
