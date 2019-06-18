import { Component, OnInit } from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import { GoogleAuthService } from 'ng-gapi';
import {GoogleAnalyticsAuthService} from "../../services/google-analytics-auth.service";
// import HttpBatch = gapi.client.HttpBatch;

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  private token: String;

  constructor(
    private googleAnalyticsAuthService: GoogleAnalyticsAuthService,
    private authService: GoogleAuthService,
    gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe();
  }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.googleAnalyticsAuthService.isUserSignedIn();
  }

  public signIn() {
    this.googleAnalyticsAuthService.signIn()
  }

  public signOut() {
    this.googleAnalyticsAuthService.signOut();
  }

  public setToken () {
    this.token = this.googleAnalyticsAuthService.getToken();
  }

  // public queryReports() {
  //   gapi.client.request({
  //     path: '/v4/reports:batchGet',
  //     root: 'https://analyticsreporting.googleapis.com/',
  //     method: 'POST',
  //     body: {
  //       reportRequests: [
  //         {
  //           viewId: this.token,
  //           dateRanges: [
  //             {
  //               startDate: '7daysAgo',
  //               endDate: 'today'
  //             }
  //           ],
  //           metrics: [
  //             {
  //               expression: 'ga:sessions'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   }).then(this.displayResults, console.error.bind(console));
  // }
  //
  // public displayResults(response) {
  //   var formattedJson = JSON.stringify(response.result, null, 2);
  // }
}
