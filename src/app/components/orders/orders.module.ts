import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {MatSlideToggleModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    OrdersComponent
  ]
})
export class OrdersModule {
}
