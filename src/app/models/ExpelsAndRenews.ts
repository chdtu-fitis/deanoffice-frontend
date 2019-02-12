import {OrderReason} from './OrderReason';
import {Payment} from './payment.enum';

export class ExpelsAndRenews {
  operation: string;
  expelOrRenewId: number;
  expelOrRenewStudyYear: number;
  expelOrRenewPayment: Payment;
  expelOrRenewDate: Date;
  expelOrRenewOrderNumber: string;
  expelOrRenewOrderDate: Date;
  orderReason?: OrderReason;
  expelOrRenewApplicationDate: Date;
}
