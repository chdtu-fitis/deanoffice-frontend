import {DiplomaAndSynchronizedStudentDTO} from './DiplomaAndSynchronizedStudentDTO';
import {MissingEdeboDiplomaRedDTO} from './MissingEdeboDiplomaRedDTO';

export class DiplomaListDTO {
  diplomaAndStudentSynchronizedDataDTOs: DiplomaAndSynchronizedStudentDTO[];
  missingDataRedDTOs: MissingEdeboDiplomaRedDTO[];
}
