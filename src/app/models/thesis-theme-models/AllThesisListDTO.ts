import {ImportedThesisDataDTO} from './ImportedThesisDataDTO';
import {MissingThesisDataRedDTO} from './MissingThesisDataRedDTO';

export class AllThesisListDTO {
  importedThesisDataDTOs: ImportedThesisDataDTO[];
  missingThesisDataRedDTOs: MissingThesisDataRedDTO;
}
