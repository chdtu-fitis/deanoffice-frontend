import { Component, OnInit } from '@angular/core';
import {OrderApproverTemplate} from "../../../models/order/OrderApproverTemplate";
import {OrderApproversTemplateService} from "../../../services/order-approvers-template.service";

@Component({
  selector: 'order-approvers-template',
  templateUrl: './order-approvers-template.component.html',
  styleUrls: ['./order-approvers-template.component.scss']
})
export class OrderApproversTemplateComponent implements OnInit {

  availableOrderApproverTemplates: OrderApproverTemplate[] = [];
  isCreationOpened:boolean = false;

  constructor(private orderApproversTemplateService: OrderApproversTemplateService) {
  }

  ngOnInit() {
    this.loadOrderApproversTemplates();
  }

  loadOrderApproversTemplates(): void {
    this.orderApproversTemplateService.getOrderApproversTemplates(true).subscribe(approvers => this.availableOrderApproverTemplates = approvers);
  }

  onCreateTemplate() {
    this.isCreationOpened = true;
  }

  isCreateClosed($event: boolean) {
    this.isCreationOpened = $event;
  }

  onAddApproversTemplate(orderApproverTemplate) {
    this.orderApproversTemplateService.createOrderApproversTemplate(orderApproverTemplate)
      .subscribe(orderApproverTemplate => this.availableOrderApproverTemplates.push(orderApproverTemplate));
  }
}
