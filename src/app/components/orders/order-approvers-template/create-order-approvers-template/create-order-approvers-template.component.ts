import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderApproversService} from "../../../../services/order-approvers.service";
import {OrderApprover} from "../../../../models/order/OrderApprover";
import {OrderApproverTemplate} from "../../../../models/order/OrderApproverTemplate";
import {OrderApproversTemplateService} from "../../../../services/order-approvers-template.service";

@Component({
  selector: 'create-order-approvers-template',
  templateUrl: './create-order-approvers-template.component.html',
  styleUrls: ['./create-order-approvers-template.component.scss']
})
export class CreateOrderApproversTemplateComponent implements OnInit {

  allApprovers: OrderApprover[];
  mainApprover: OrderApprover;
  overallApprovers: OrderApprover[] = [];
  initiatorApprover: OrderApprover;
  active:boolean = false;

  @Input() isOpened: boolean;
  @Output() onModalClosed = new EventEmitter<boolean>();
  @Output() newTemplate = new EventEmitter<OrderApproverTemplate>();

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
  cleanUpState() {
    this.mainApprover = OrderApprover.empty()
    this.overallApprovers = []
    this.initiatorApprover = OrderApprover.empty()

  }

  onAnnul() {
    this.cleanUpState();
  }
  deletOverallApprover(id:number) {
    let deleteIndex = this.overallApprovers.findIndex(approver => approver.id == id );
    this.overallApprovers.splice(deleteIndex, 1);
  }

  onCreateApproversTemplate() {
    let orderApproverTemplate = new OrderApproverTemplate(this.mainApprover, this.overallApprovers, this.initiatorApprover);
    this.newTemplate.emit(orderApproverTemplate);
    this.cleanUpState();
    this.closeModalWindow();
  }

  closeModalWindow() {
    this.onModalClosed.emit(!this.isOpened);
  }
}
