import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DepartmentRoutingModule} from './department-routing.module';
import {DepartmentComponent} from './department.component';
import {SharedModule} from '../shared/shared.module';
import {AddDepartmentComponent} from './add-department/add-department.component';
import {DepartmentFormComponent} from './department-form/department-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DeleteDepartmentComponent} from './delete-department/delete-department.component';
import { UpdateDepartmentComponent } from './update-department/update-department.component';


@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    DepartmentComponent,
    AddDepartmentComponent,
    DepartmentFormComponent,
    DeleteDepartmentComponent,
    UpdateDepartmentComponent
  ]

})
export class DepartmentModule {
}
