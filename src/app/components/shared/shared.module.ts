import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ModalModule} from 'ngx-bootstrap';

import {ModalComponent} from './modal/modal.component';
import {EntriesPipe} from '../../pipes/entries.pipe';
import {SidebarComponent} from '../app/sidebar/sidebar.component';
import {ValidationDirective} from './validation.directive';
import {ValidationErrorsComponent} from './validation-errors/validation-errors.component';

@NgModule({
  declarations: [
    EntriesPipe,
    ModalComponent,
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
  ],
  exports: [
    CommonModule,
    ModalModule,
    NgxDatatableModule,
    EntriesPipe,
    ModalComponent,
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
  ]
})

export class SharedModule {
}
