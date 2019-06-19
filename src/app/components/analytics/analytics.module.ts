import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {AuthenticationModule} from '../login/authentication.module';
import {PipeModule} from '../../pipes/pipe.module';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from "ng-gapi";

import {AnalyticsComponent} from "./analytics.component";
import {GoogleAnalyticsAuthService} from "../../services/google-analytics-auth.service";
import {AnalyticsApiService} from "../../services/analytics-api.service";

let gapiClientConfig: NgGapiClientConfig = {
  client_id: "1099349836573-dlcq5gbttttj702il50gs8rkq074dunu.apps.googleusercontent.com",
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
  scope: [
    "https://www.googleapis.com/auth/analytics.readonly",
    "https://www.googleapis.com/auth/analytics"
  ].join(" ")
};

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
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  declarations: [
    AnalyticsComponent
  ],
  providers: [AuthenticationModule.tokenInterceptor(), GoogleAnalyticsAuthService, AnalyticsApiService]
})

export class AnalyticsModule { }
