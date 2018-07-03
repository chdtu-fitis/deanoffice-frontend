import {ProfessionalQualification} from "./professional-qualification";
import {SelectionMode} from "../enums/selection-mode.enum";

export class SelectedQualification {
  qualifications: ProfessionalQualification[];
  selectionMode: SelectionMode;
}
