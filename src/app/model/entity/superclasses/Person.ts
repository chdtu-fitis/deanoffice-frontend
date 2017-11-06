import {BaseEntity} from "./BaseEntity";
export class Person extends BaseEntity{
  surname: string;
  name: string;
  patronimic: string;
  active: boolean;
}
