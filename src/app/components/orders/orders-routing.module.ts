import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {OrderApproversComponent} from "./order-approvers/order-approvers.component";

const routes: Routes = [
    {path: '', component: OrdersComponent},
    {path: 'approvers', component: OrderApproversComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
