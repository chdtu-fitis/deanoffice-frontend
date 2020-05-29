import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderApprover} from "../../../../models/order/OrderApprover";
import {OrderApproversService} from "../../../../services/order-approvers.service";

@Component({
  selector: 'order-approvers-form',
  templateUrl: './order-approvers-form.component.html',
  styleUrls: ['./order-approvers-form.component.scss']
})
export class OrderApproversFormComponent implements OnInit {
  @Output() newApproverSave = new EventEmitter<OrderApprover>();

  orderApprover: OrderApprover;

  constructor(private orderApproversService: OrderApproversService) { }

  ngOnInit() {
   this.orderApprover = OrderApprover.empty();
  }

  onAddApprover() {
    this.orderApprover.active = true;
    this.orderApproversService.addOrderApprover(this.orderApprover)
      .subscribe(orderApprover => this.newApproverSave.emit(orderApprover));
    this.orderApprover = OrderApprover.empty();
  }
}
