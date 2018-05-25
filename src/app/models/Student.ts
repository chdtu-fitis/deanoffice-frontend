import {Person} from './basemodels/Person';
import {StudentGroup} from './StudentGroup';
import {Privilege} from './Privilege';

export class Student extends Person {
  surnameEng?: string;
  nameEng?: string;
  patronimicEng?: string;
  sex: string;
  studentGroup: StudentGroup;
  birthDate: Date;
  registrationAdress?: string;
  actualAdress?: string;
  school?: string;
  recordGroupNumber?: string;
  studentCardNumber?: string;
  telephone?: string;
  email?: string;
  privilege?: Privilege;
  fatherName?: string;
  fatherPhone?: string;
  fatherInfo?: string;
  motherName?: string;
  motherPhone?: string;
  motherInfo?: string;
  notes?: string;
  photoUrl?: any;
}
