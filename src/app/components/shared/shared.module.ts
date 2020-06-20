import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AgGridModule} from '@ag-grid-community/angular';
import {ModalModule} from 'ngx-bootstrap/modal';

import {SidebarComponent} from '../app/sidebar/sidebar.component';
import {ValidationDirective} from './validation.directive';
import {ValidationErrorsComponent} from './validation-errors/validation-errors.component';
import {BaseReactiveFormComponent} from './base-reactive-form/base-reactive-form.component';
import {LoadingComponent} from './loading/loading.component';
import {PipeModule} from '../../pipes/pipe.module';
import {ModalWrapperComponent} from './modal-wrapper/modal-wrapper.component';
import {ExpectedNameDirective} from './expected-name.directive';
import {StudentTypeaheadComponent} from '../students/student-typeahead/student-typeahead.component';
import {FormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
    LoadingComponent,
    ModalWrapperComponent,
    ExpectedNameDirective,
    StudentTypeaheadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    PipeModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    ModalModule,
    AgGridModule,
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
    LoadingComponent,
    ModalWrapperComponent,
    ExpectedNameDirective,
    StudentTypeaheadComponent
  ]
})

export class SharedModule {
}
