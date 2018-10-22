
import {Student} from './Student';
import {Specialization} from './Specialization';

export class StudentDegreeFullEdeboData {
  id?: number;
  student?: Student ;
  specialization?: Specialization;
  previousDiplomaNumber?: string ;
  previousDiplomaDate?: Date ;
  previousDiplomaType?: string;
  previousDiplomaIssuedBy?: string;
  supplementNumber?: string;
  admissionDate?: Date;
  admissionOrderNumber?: string;
  admissionOrderDate?: Date;
  payment?: string;
  selected?: boolean;
}
