import {OrderApprover} from "./OrderApprover";
import {Faculty} from "../Faculty";

export class OrderApproverTemplate {

  public static get IGNORE_PROPERTIES() { return ["selected"] }

  public static prepareBody(body: OrderApproverTemplate): OrderApproverTemplate {
    const ignoreProperties = OrderApproverTemplate.IGNORE_PROPERTIES;

    OrderApprover.ignoreApproverFields(body.mainApprover, ignoreProperties);
    OrderApprover.ignoreApproverFields(body.initiatorApprover, ignoreProperties);
    OrderApprover.ignoreApproversFields(body.approvers, ignoreProperties);
    return body;
  }

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
