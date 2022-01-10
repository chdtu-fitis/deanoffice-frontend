
import {Student} from './Student';
import {Specialization} from './Specialization';
import {DiplomaType} from '../diploma-type.enum';
import {Payment} from '../payment.enum';
import {TuitionForm} from "../tuition-form.enum";
import {TuitionTerm} from "../tuition-term.enum";
import {Citizenship} from "../citizenship.enum";

export class StudentDegreeFullEdeboData {
  id?: number;
  student?: Student ;
  specialization?: Specialization;
  previousDiplomaNumber?: string ;
  previousDiplomaDate?: Date;
  previousDiplomaType?: DiplomaType;
  previousDiplomaIssuedBy?: string;
  edeboId?: string;
  admissionDate?: Date;
  admissionOrderNumber?: string;
  admissionOrderDate?: Date;
  payment?: Payment;
  tuitionForm: TuitionForm;
  tuitionTerm: TuitionTerm;
  citizenship: Citizenship;
  modified?: boolean;
  selected?: boolean;
  similarInDB?: boolean;
}
