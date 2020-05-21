import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {MatSlideToggleModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {OrdersService} from '../../services/orders.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { DeductionOrderComponent } from './add-order/deduction-order/deduction-order.component';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { OrderApproversComponent } from './order-approvers/order-approvers.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
    TypeaheadModule.forRoot(),
  ],
  declarations: [
    OrdersComponent,
    AddOrderComponent,
    DeductionOrderComponent,
    OrderApproversComponent
  ],
  providers: [OrdersService]
})
export class OrdersModule {
}
