import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrdersComponent} from './orders.component';
import {OrderApproversComponent} from "./order-approvers/order-approvers.component";
import {OrderApproversTemplateComponent} from "./order-approvers-template/order-approvers-template.component";

const routes: Routes = [
    {path: '', component: OrdersComponent},
    {path: 'approvers', component: OrderApproversComponent},
    {path: 'approvers/template', component: OrderApproversTemplateComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {
}
