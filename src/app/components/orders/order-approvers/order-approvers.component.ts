import { Component, OnInit } from '@angular/core';
import {OrderApproversService} from "../../../services/order-approvers.service";
import {OrderApprover} from "../../../models/order/OrderApprover";

@Component({
  selector: 'order-approvers',
  templateUrl: './order-approvers.component.html',
  styleUrls: ['./order-approvers.component.scss']
})
export class OrderApproversComponent implements OnInit {
  universityApprovers: OrderApprover[];
  facultyApprovers: OrderApprover[];
  active: boolean = true;

  constructor(private orderApproversService: OrderApproversService) { }

  ngOnInit() {
    this.loadApprovers();
  }

  onCreateOrderApprover(approver: OrderApprover) {
    this.facultyApprovers.push(approver);
  }

  removeOrder(id: number) {
    this.orderApproversService.deleteApprover(id).subscribe(() => {
      let deleteIndex = this.facultyApprovers.findIndex(approver => approver.id == id );
      this.facultyApprovers.splice(deleteIndex, 1);
    });
  }

  loadApprovers(): void {
    this.orderApproversService.getApprovers(this.active).subscribe(approvers => {
      this.universityApprovers = [];
      this.facultyApprovers = [];
      for (let approver of approvers) {
        if (approver.faculty === null) {
          this.universityApprovers.push(approver);
        } else {
          this.facultyApprovers.push(approver);
        }
      }
    });
  }

  restoreApprover(id: number) {
    this.orderApproversService.restoreApprover(id).subscribe(() => {
      let deleteIndex = this.facultyApprovers.findIndex(approver => approver.id == id );
      this.facultyApprovers.splice(deleteIndex, 1);
    })
  }
}
