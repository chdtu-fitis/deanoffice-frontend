import { Injectable } from '@angular/core';
import * as _ from "lodash";
import GoogleUser = gapi.auth2.GoogleUser;
import {GoogleAuthService} from "ng-gapi";

@Injectable()
export class GoogleAnalyticsAuthService {
  public static readonly SESSION_STORAGE_KEY: string = "accessToken";
  private user: GoogleUser = undefined;

  constructor(private googleAuthService: GoogleAuthService) {
  }

  public setUser(user: GoogleUser): void {
    this.user = user;
  }

  public getCurrentUser(): GoogleUser {
    return this.user;
  }

  public getToken(): string {
    let token: string = sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error("no token set , authentication required");
    }
    return sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY);
  }

  public isUserSignedIn(): boolean {
    return !_.isEmpty(sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY));
  }

  public signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
    });
  }

  public signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      try {
        auth.signOut();
      } catch (e) {
        console.error(e);
      }
      sessionStorage.removeItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY)
    });
  }

  private signInSuccessHandler(res: GoogleUser) {
      this.user = res;
      sessionStorage.setItem(
        GoogleAnalyticsAuthService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
      );
  }

  private signInErrorHandler(err) {
    console.warn(err);
  }
}
