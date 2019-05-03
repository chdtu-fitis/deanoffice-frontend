import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

import {PipeModule} from '../../pipes/pipe.module';
import {TeachersComponent} from './teachers.component';
import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import {TabsModule} from 'ngx-bootstrap';
//import { DeleteTeacherComponent } from './delete-teacher/delete-teacher.component';


export const teacherRoutes: Routes = [
  {path: '', component: TeachersComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TabsModule.forRoot(),
    PipeModule.forRoot(),
    RouterModule.forChild(teacherRoutes),
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [
    TeachersComponent,
    TeacherFormComponent,
    AddTeacherComponent
    //DeleteTeacherComponent
  ],
  providers: [
    AuthenticationModule.tokenInterceptor()
  ]
})
export class TeachersModule { }
