import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesForGroupsComponent } from './courses-for-groups.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CoursesForGroupsComponent,
    TableComponent,
    FormComponent
  ],
  exports: [
    CoursesForGroupsComponent
  ]
})
export class CoursesForGroupsModule { }
