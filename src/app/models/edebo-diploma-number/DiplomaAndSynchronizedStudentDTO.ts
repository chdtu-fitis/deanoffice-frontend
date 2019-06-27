import {DiplomaNumberForSaveDTO} from './DiplomaNumberForSaveDTO';

export class DiplomaAndSynchronizedStudentDTO extends DiplomaNumberForSaveDTO {
  fullSpecialityName: string;
  groupName: string;
  selected?: boolean;
}
