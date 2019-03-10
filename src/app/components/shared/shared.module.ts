import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AgGridModule} from 'ag-grid-angular';
import {ModalModule} from 'ngx-bootstrap';

import {SidebarComponent} from '../app/sidebar/sidebar.component';
import {ValidationDirective} from './validation.directive';
import {ValidationErrorsComponent} from './validation-errors/validation-errors.component';
import {BaseReactiveFormComponent} from './base-reactive-form/base-reactive-form.component';
import {LoadingComponent} from './loading/loading.component';
import {PipeModule} from '../../pipes/pipe.module';
import {ModalWrapperComponent} from './modal-wrapper/modal-wrapper.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
    LoadingComponent,
    ModalWrapperComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    PipeModule
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
    ModalWrapperComponent
  ]
})

export class SharedModule {
}
