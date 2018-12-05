import { BaseEntity } from './BaseEntity';

export class Person extends BaseEntity {
  active: boolean;
  surname: string;
  name: string;
  patronimic: string;
  id: number;
}
