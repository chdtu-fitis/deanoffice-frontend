import {Person} from '../basemodels/Person';
import {DiplomaAndSynchronizedStudentDTO} from './DiplomaAndSynchronizedStudentDTO';

export class DiplomaNumberForSaveDTO  extends Person {
  diplomaSeriesAndNumber: string;
  honor: boolean;

  constructor(student: DiplomaAndSynchronizedStudentDTO) {
    super();
    this.id = student.id;
    this.surname = student.surname;
    this.name = student.name;
    this.patronimic = student.patronimic;
    this.diplomaSeriesAndNumber = student.diplomaSeriesAndNumber;
    this.honor = student.honor;
  }

}
