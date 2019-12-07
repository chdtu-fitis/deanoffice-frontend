import {Person} from '../../../../models/basemodels/Person';

export class Student {
  constructor(public person: Person, public studentDegreeId: number) {}
}
