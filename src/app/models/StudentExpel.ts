import { BaseEntity } from './basemodels/BaseEntity';
import { Student } from './Student';
import { StudentGroup } from './StudentGroup';
import { OrderReason } from './OrderReason';

export class StudentExpel extends BaseEntity {
  student: Student;
  expelDate: Date;
  orderNumber: string;
  orderDate: Date;
  group: StudentGroup;
  orderReason: OrderReason;
  applicationDate: Date;
}
