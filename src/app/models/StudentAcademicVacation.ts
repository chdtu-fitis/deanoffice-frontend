import {BaseEntity} from './basemodels/BaseEntity';
import {StudentGroup} from './StudentGroup';
import {OrderReason} from './OrderReason';
import {StudentDegree} from "./StudentDegree";

export class StudentAcademicVacation extends BaseEntity {
  studentDegree: StudentDegree;
  vacationStartDate: Date;
  vacationEndDate: Date;
  orderNumber: String;
  orderDate: Date;
  group: StudentGroup;
  orderReason: OrderReason;
  applicationDate: Date;
}
