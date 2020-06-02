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

  constructor(id, fullName, faculty, position, active) {
    this.id = id;
    this.fullName = fullName;
    this.faculty = faculty;
    this.position = position;
    this.active = active;
  }
}
