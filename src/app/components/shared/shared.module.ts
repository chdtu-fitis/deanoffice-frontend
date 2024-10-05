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
import {StudiedCoursesComponent} from "./courses-for/studied-courses/studied-courses.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CourseCreationComponent} from "./courses-for/course-creation/course-creation.component";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";

@NgModule({
  declarations: [
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
    LoadingComponent,
    ModalWrapperComponent,
    ExpectedNameDirective,
    StudiedCoursesComponent,
    CourseCreationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    PipeModule,
    TypeaheadModule.forRoot()
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
    StudiedCoursesComponent,
    CourseCreationComponent
  ]
})

export class SharedModule {
}
