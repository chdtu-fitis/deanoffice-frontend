import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ModalModule} from 'ngx-bootstrap';

import {StudentsComponent} from './students.component';
import {StudentsTableComponent} from './students-table/students-table.component';
import {StudentsColumnsComponent} from './students-columns/students-columns.component';
import {ModalComponent} from '../modal/modal.component';
import {EntriesPipe} from '../../pipes/entries.pipe';

@NgModule({
  declarations: [
    StudentsComponent,
    StudentsTableComponent,
    StudentsColumnsComponent,
    EntriesPipe,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
  ],
})

export class StudentsModule {
}
