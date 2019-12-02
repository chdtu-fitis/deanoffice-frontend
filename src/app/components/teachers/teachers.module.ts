import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {PipeModule} from '../../pipes/pipe.module';
import {TeachersComponent} from './teachers.component';
import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import {TabsModule} from 'ngx-bootstrap';
import { DeleteTeacherComponent } from './delete-teacher/delete-teacher.component';
import { UpdateTeacherComponent } from './update-teacher/update-teacher.component';


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
    RouterModule.forChild(teacherRoutes)
  ],
  declarations: [
    TeachersComponent,
    TeacherFormComponent,
    AddTeacherComponent,
    DeleteTeacherComponent,
    UpdateTeacherComponent
  ],
  providers: [
    AuthenticationModule.tokenInterceptor()
  ]
})
export class TeachersModule { }
