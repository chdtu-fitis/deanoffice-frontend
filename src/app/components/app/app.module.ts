import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

import {PipeModule} from '../../pipes/pipe.module';
import {AuthenticationModule} from '../login/authentication.module';
import {SharedModule} from '../shared/shared.module';

import {appRoutes} from './app-routes';
import {GUARDS, SERVICES} from '../../services';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    PipeModule
  ],
  providers: [
    ...SERVICES,
    ...GUARDS,
    AuthenticationModule.tokenInterceptor(),
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
