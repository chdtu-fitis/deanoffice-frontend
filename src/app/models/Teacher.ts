import {Person} from './basemodels/Person';
import {Department} from './Department';

export class Teacher extends Person {
  department: Department;
  position: Position;
  sex: string;
  scientificDegree: string;

  positionId?: number;
  departmentId?: number;

    constructor() {
    super();
  }
}
