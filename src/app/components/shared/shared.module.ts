import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ModalModule} from 'ngx-bootstrap';

import {EntriesPipe} from '../../pipes/entries.pipe';
import {SidebarComponent} from '../app/sidebar/sidebar.component';
import {ValidationDirective} from './validation.directive';
import {ValidationErrorsComponent} from './validation-errors/validation-errors.component';
import {BaseReactiveFormComponent} from './base-reactive-form/base-reactive-form.component';

@NgModule({
  declarations: [
    EntriesPipe,
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
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
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
  ]
})

export class SharedModule {
}
