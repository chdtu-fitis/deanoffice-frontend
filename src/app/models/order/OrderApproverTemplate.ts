import {OrderApprover} from "./OrderApprover";

export class OrderApproverTemplate {
  id: number;
  mainApprover: OrderApprover;
  approvers: Array<OrderApprover>;
  initiatorApprover: OrderApprover;
  active: boolean;

  constructor(mainApprover, approvers, initiatorApprover) {
    this.active = true;
    this.mainApprover = mainApprover;
    this.approvers = approvers;
    this.initiatorApprover = initiatorApprover;
  }
}
