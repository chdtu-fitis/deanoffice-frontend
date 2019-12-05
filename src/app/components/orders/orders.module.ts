import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {MatSlideToggleModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {OrdersService} from '../../services/orders.service';
import { AddOrderComponent } from './add-order/add-order.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    OrdersComponent,
    AddOrderComponent
  ],
  providers: [OrdersService]
})
export class OrdersModule {
}
