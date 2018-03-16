import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {StudentsComponent} from './students.component';
import {StudentsTableComponent} from './students-table/students-table.component';
import {StudentsColumnsComponent} from './students-columns/students-columns.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsColumnsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
})

export class StudentsModule {
}
