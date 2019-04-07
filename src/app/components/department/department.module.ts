import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentRoutingModule} from './department-routing.module';
import {DepartmentComponent} from './department.component';
import {SharedModule} from '../shared/shared.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {AddDepartmentComponent} from './add-department/add-department.component';
import {DepartmentFormComponent} from './department-form/department-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    SimpleNotificationsModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent,
    DepartmentFormComponent
  ]

})
export class DepartmentModule {
}
