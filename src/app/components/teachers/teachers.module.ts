import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

import {PipeModule} from '../../pipes/pipe.module';
import {TeachersComponent} from './teachers.component';
import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';

export const teacherRoutes: Routes = [
  {path: '', component: TeachersComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(teacherRoutes),
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [
    TeachersComponent
  ],
  providers: [
    AuthenticationModule.tokenInterceptor()
  ]
})
export class TeachersModule { }
