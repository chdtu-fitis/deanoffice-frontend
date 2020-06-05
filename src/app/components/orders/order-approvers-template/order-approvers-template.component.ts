import { Component, OnInit } from '@angular/core';
import {OrderApproversService} from "../../../services/order-approvers.service";
import {OrderApprover} from "../../../models/order/OrderApprover";
import {OrderApproverTemplate} from "../../../models/order/OrderApproverTemplate";
import {OrderApproversTemplateService} from "../../../services/order-approvers-template.service";

@Component({
  selector: 'order-approvers-template',
  templateUrl: './order-approvers-template.component.html',
  styleUrls: ['./order-approvers-template.component.scss']
})
export class OrderApproversTemplateComponent implements OnInit {

  allApprovers: OrderApprover[];
  mainApprover: OrderApprover;
  overallApprovers: OrderApprover[] = [];
  initiatorApprover: OrderApprover;
  active:boolean = false;
  orderApproverTemplate: OrderApproverTemplate;
  availableOrderApproverTemplate: OrderApproverTemplate[] = [];

  constructor(private orderApproversService: OrderApproversService, private orderApproversTemplateService: OrderApproversTemplateService) { }

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
        for (let selectedApprover of this.overallApprovers) {
          if (approver.id == selectedApprover.id) {
            found = true;
            break;
          }
        }
        if (!found) {
          this.overallApprovers.push(approver);
        }
        approver.selected = false;
      }
    }
  }

  deletOverallApprover(id:number) {
    let deleteIndex = this.overallApprovers.findIndex(approver => approver.id == id );
    this.overallApprovers.splice(deleteIndex, 1);
  }

  onSaveApproversTemplate() {
    // //this.orderApproverTemplate.faculty.id = this.currentUserService.facultyId();
    // this.orderApproverTemplate.mainApprover = this.mainApprover;
    // this.orderApproverTemplate.initiatorApprover = this.initiatorApprover;
    // this.orderApproverTemplate.approvers.push(this.overallApprovers);
    // this.orderApproversTemplateService.addOrderApproversTemplate(this.orderApproverTemplate)
    //   .subscribe(orderApproverTemplate => this.availableOrderApproverTemplate.push(orderApproverTemplate);
  }
}
