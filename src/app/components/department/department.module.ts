import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ],
  declarations: [
    DepartmentComponent
  ]
})
export class DepartmentModule { }
