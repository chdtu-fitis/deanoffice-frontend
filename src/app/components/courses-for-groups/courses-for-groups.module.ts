import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesForGroupsComponent} from './courses-for-groups.component';
import {TableComponent} from './table/table.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SelectionFormComponent} from './form/selection-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [
    CoursesForGroupsComponent,
    TableComponent,
    SelectionFormComponent
  ],
  exports: [
    CoursesForGroupsComponent
  ]
})
export class CoursesForGroupsModule {
}
