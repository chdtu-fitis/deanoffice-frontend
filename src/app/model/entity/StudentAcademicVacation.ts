import {BaseEntity} from "./superclasses/BaseEntity";
import {Student} from "./Student";
import {StudentGroup} from "./StudentGroup";
import {OrderReason} from "./OrderReason";
export class StudentAcademicVacation extends BaseEntity{
  student: Student;
  vacationStartDate: Date;
  vacationEndDate: Date;
  orderNumber: String;
  orderDate: Date;
  group: StudentGroup;
  reason: OrderReason;
  applicationDate: Date;
}
