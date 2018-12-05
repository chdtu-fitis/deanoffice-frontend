import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';

import { SidebarComponent } from '../app/sidebar/sidebar.component';
import { ValidationDirective } from './validation.directive';
import { ValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { BaseReactiveFormComponent } from './base-reactive-form/base-reactive-form.component';
import { LoadingComponent } from './loading/loading.component';
import { PipeModule } from '../../pipes/pipe.module';

@NgModule({
  declarations: [
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    PipeModule
  ],
  exports: [
    CommonModule,
    ModalModule,
    NgxDatatableModule,
    SidebarComponent,
    ValidationDirective,
    ValidationErrorsComponent,
    BaseReactiveFormComponent,
    LoadingComponent
  ]
})

export class SharedModule {
}
