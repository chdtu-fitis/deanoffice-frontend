import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginGuard} from '../../services/auth/auth.guard';
import {TokenInterceptor} from '../../services/auth/token.interceptor';
import {RouterModule} from '@angular/router';
import {authRoutes} from '../../routes/routes';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthenticationModule {
}
