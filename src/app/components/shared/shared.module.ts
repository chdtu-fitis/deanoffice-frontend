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
import {StudiedCoursesComponent} from "./studied-courses/studied-courses.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
    LoadingComponent,
    ModalWrapperComponent,
    ExpectedNameDirective,
    StudiedCoursesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    ModalWrapperComponent,
    ExpectedNameDirective,
    StudiedCoursesComponent
  ]
})

export class SharedModule {
}
