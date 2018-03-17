import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {StudentsComponent} from './students.component';
import {StudentsTableComponent} from './students-table/students-table.component';
import {StudentsColumnsComponent} from './students-columns/students-columns.component';
import {SharedModule} from '../shared/shared.module';
import {StudentPersonalInfoComponent} from './student-personal-info/student-personal-info.component';
import {StudentsFiltersComponent} from './students-filters/students-filters.component';
import {StudentsSearchComponent} from './students-search/students-search.component';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsColumnsComponent,
    StudentsFiltersComponent,
    StudentsSearchComponent,
    StudentPersonalInfoComponent,
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
