import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderApprover} from "../../../../models/order/OrderApprover";
import {OrderApproversService} from "../../../../services/order-approvers.service";
import {CurrentUserService} from "../../../../services/auth/current-user.service";

@Component({
  selector: 'order-approvers-form',
  templateUrl: './order-approvers-form.component.html',
  styleUrls: ['./order-approvers-form.component.scss']
})
export class OrderApproversFormComponent implements OnInit {
  @Output() newApproverSave = new EventEmitter<OrderApprover>();
  @Input() active: boolean;
  orderApprover: OrderApprover;

  constructor(private orderApproversService: OrderApproversService, private currentUserService: CurrentUserService) { }

  ngOnInit() {
   this.orderApprover = OrderApprover.empty();
  }

  onAddApprover() {
    this.orderApprover.faculty.id = this.currentUserService.facultyId();
    this.orderApprover.active = true;
    this.orderApproversService.addOrderApprover(this.orderApprover)
      .subscribe(orderApprover => this.newApproverSave.emit(orderApprover));
    this.orderApprover = OrderApprover.empty();
  }
}
