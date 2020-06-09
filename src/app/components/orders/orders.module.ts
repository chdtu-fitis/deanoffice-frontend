import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {MatSlideToggleModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {OrdersService} from '../../services/orders.service';
import { AddOrderComponent } from './add-order/add-order.component';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import { OrderApproversComponent } from './order-approvers/order-approvers.component';
import { OrderApproversFormComponent } from './order-approvers/order-approvers-forms/order-approvers-form.component';
import {StudentExpelOrderComponent} from "./add-order/student-expel-order/student-expel-order.component";
import { OrderApproversTemplateComponent } from './order-approvers-template/order-approvers-template.component';
import {InitialsAndSurnamePipe} from "../../pipes/initials-and-surname.pipe";
import { CreateOrderApproversTemplateComponent } from './order-approvers-template/create-order-approvers-template/create-order-approvers-template.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
    TypeaheadModule.forRoot(),
    FormsModule,
  ],
  declarations: [
    OrdersComponent,
    AddOrderComponent,
    OrderApproversComponent,
    OrderApproversFormComponent,
    StudentExpelOrderComponent,
    OrderApproversTemplateComponent,
    InitialsAndSurnamePipe,
    CreateOrderApproversTemplateComponent
  ],
  entryComponents: [StudentExpelOrderComponent],
  providers: [OrdersService, InitialsAndSurnamePipe]
})
export class OrdersModule {
}
