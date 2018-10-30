
import {Student} from './Student';
import {Specialization} from './Specialization';
import {DiplomaType} from '../diploma-type.enum';
import {Payment} from '../payment.enum';

export class StudentDegreeFullEdeboData {
  id?: number;
  student?: Student ;
  specialization?: Specialization;
  previousDiplomaNumber?: string ;
  previousDiplomaDate?: Date;
  previousDiplomaType?: DiplomaType;
  previousDiplomaIssuedBy?: string;
  supplementNumber?: string;
  admissionDate?: Date;
  admissionOrderNumber?: string;
  admissionOrderDate?: Date;
  payment?: Payment;
  selected?: boolean;
}
