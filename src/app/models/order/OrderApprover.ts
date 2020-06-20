import {Faculty} from "../Faculty";

export class OrderApprover {
  id: number | null;
  fullName: string;
  faculty: Faculty;
  position: string;
  active: boolean;
  selected?: boolean;

  public static empty(): OrderApprover {
    return new OrderApprover(null,'', new Faculty(), '',  '')
  }

  public static ignoreApproversFields(approvers: Array<OrderApprover>, ignoreProperties: string[]): Array<OrderApprover> {
    return approvers.map((approver)=> {
      OrderApprover.ignoreApproverFields(approver, ignoreProperties)
      return approver
    })
  }

  public static ignoreApproverFields(approver: OrderApprover, ignoreProperties: string[]): OrderApprover {
    ignoreProperties.forEach((property) => {
      delete approver[property];
    })
    return approver
  }

  constructor(id, fullName, faculty, position, active) {
    this.id = id;
    this.fullName = fullName;
    this.faculty = faculty;
    this.position = position;
    this.active = active;
  }
}
