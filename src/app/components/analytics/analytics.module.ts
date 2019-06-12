import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';
import {PipeModule} from '../../pipes/pipe.module';

import {AnalyticsComponent} from "./analytics.component";

const analyticsRoutes: Routes = [
  {path: '', component: AnalyticsComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipeModule,
    RouterModule.forChild(analyticsRoutes),
  ],
  declarations: [
    AnalyticsComponent
  ],
  providers: [AuthenticationModule.tokenInterceptor()]
})
export class AnalyticsModule { }
