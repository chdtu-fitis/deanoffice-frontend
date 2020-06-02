import { Component, OnInit } from '@angular/core';
import {OrderApproversService} from "../../../services/order-approvers.service";
import {OrderApprover} from "../../../models/order/OrderApprover";

@Component({
  selector: 'order-approvers-template',
  templateUrl: './order-approvers-template.component.html',
  styleUrls: ['./order-approvers-template.component.scss']
})
export class OrderApproversTemplateComponent implements OnInit {

  allApprovers: OrderApprover[];
  mainApprover: OrderApprover;
  overrallApprovers: OrderApprover[] = [];
  initiatorApprover: OrderApprover;

  constructor(private orderApproversService: OrderApproversService) { }

  ngOnInit() {
    this.loadApprovers();
  }

  loadApprovers(): void {
    this.orderApproversService.getApprovers(true).subscribe(approvers => this.allApprovers = approvers);
  }

  addMainApprover(): void {
    for (let approver of this.allApprovers) {
      if (approver.selected) {
        this.mainApprover = approver;
        approver.selected = false;
        break;
      }
    }
  }

  addRegisteredBy(): void {
    for (let approver of this.allApprovers) {
      if (approver.selected) {
        this.initiatorApprover = approver;
        approver.selected = false;
        break;
      }
    }
  }

  addOverrallApprovers() {
    for (let approver of this.allApprovers) {
      if (approver.selected) {
        let found = false;
        for (let selectedApprover of this.overrallApprovers) {
          if (approver.id == selectedApprover.id) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.overrallApprovers.push(approver);
        }
        approver.selected = false;
      }
    }
  }
}
