import {NameWithActiveEntity} from "./superclasses/NameWithActiveEntity";
import {Faculty} from "./Faculty";
export class Department extends NameWithActiveEntity{
  abbr: string;
  faculty: Faculty;
}
