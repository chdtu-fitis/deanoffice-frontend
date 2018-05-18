import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {TokenInterceptor} from "../../services/auth/token.interceptor";

export const authRoutes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthenticationModule {
  public static tokenInterceptor() {
    return {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  }
}
