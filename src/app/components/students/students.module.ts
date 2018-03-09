import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {StudentsComponent} from './students.component';
import {StudentsTableComponent} from './students-table/students-table.component';
import {StudentsColumnsComponent} from './students-columns/students-columns.component';
import {SharedModule} from '../shared/shared.module';
import {StudentsFiltersComponent} from './students-filters/students-filters.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsColumnsComponent,
    StudentsFiltersComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})

export class StudentsModule {
}
