import { Component, OnInit } from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import { GoogleAuthService } from 'ng-gapi';
import {GoogleAnalyticsAuthService} from "../../google-analytics-auth.service";
// import HttpBatch = gapi.client.HttpBatch;

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  constructor(
    private googleAnalyticsAuthService: GoogleAnalyticsAuthService,
    private authService: GoogleAuthService,
    gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe();
    // gapiService.onLoad().subscribe(()=> {
    //   const myBatch: HttpBatch = new HttpBatch();
    //
    // });
  }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.googleAnalyticsAuthService.isUserSignedIn();
  }

  public signIn() {
    this.googleAnalyticsAuthService.signIn();
  }

}
