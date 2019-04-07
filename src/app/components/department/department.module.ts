import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentRoutingModule} from './department-routing.module';
import {DepartmentComponent} from './department.component';
import {SharedModule} from '../shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {AddDepartmentComponent} from './add-department/add-department.component';


@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent
  ]

})
export class DepartmentModule {
}
