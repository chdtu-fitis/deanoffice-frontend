import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { SimpleNotificationsModule } from 'angular2-notifications';

import {PipeModule} from '../../pipes/pipe.module';
import {AddGroupComponent} from './teachers/teachers.component';

export const groupRoutes: Routes = [
  {path: '', component: TeachersComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(groupRoutes),
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [
    TeachersComponent
  ],
  providers: [
    AcquiredCompetenciesService,
    QualificationService,
    AuthenticationModule.tokenInterceptor()
  ]
})
export class TeachersModule { }
