import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { MatSlideToggleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrdersService } from '../../services/orders.service';
import { AddOrderComponent } from './add-order/add-order.component';
import { StudentExpelOrderComponent } from './add-order/student-expel-order/student-expel-order.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

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
    StudentExpelOrderComponent
  ],
  entryComponents: [StudentExpelOrderComponent],
  providers: [OrdersService]
})
export class OrdersModule {
}
