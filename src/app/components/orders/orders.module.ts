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
import {StudentExpelOrderComponent} from './add-order/student-expel-order/student-expel-order.component';
import { StudentOrderTemplateComponent } from './add-order/student-order-template/student-order-template.component';
import {OrderReasonService} from '../../services/order-reason.service';
import {AuthenticationModule} from '../login/authentication.module';
import { StudentOrederPreviewComponent } from './add-order/student-oreder-preview/student-oreder-preview.component';

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
    StudentOrderTemplateComponent,
    StudentOrederPreviewComponent
  ],
  entryComponents: [StudentExpelOrderComponent],
  providers: [OrdersService, OrderReasonService, AuthenticationModule.tokenInterceptor()]
})
export class OrdersModule {
}
