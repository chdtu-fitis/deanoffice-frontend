import { Component, OnInit } from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import { GoogleAuthService } from 'ng-gapi';
import {GoogleAnalyticsAuthService} from "../../services/google-analytics-auth.service";
import {AnalyticsApiService} from "../../services/analytics-api.service";

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  private viewID = "196449903";
  private reportRequest;
  private usersResponse;
  private sessionsResponse;
  private users = [];
  private sessions = [];


  constructor(
    private googleAnalyticsAuthService: GoogleAnalyticsAuthService,
    private analyticsApi: AnalyticsApiService,
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

  public setReportRequest (startDate, endDate, expression){
    this.reportRequest = {
      "reportRequests": [
        {
          "viewId": this.viewID,
          "dateRanges": [
            {
              "startDate": startDate,
              "endDate": endDate
            }
          ],
          "metrics": [
            {
              "expression": expression
            }
          ]
        }
      ]
    }
  }

  public getSessions (startDate, endDate){
    this.setReportRequest(startDate, endDate, "ga:sessions");
    this.analyticsApi.getAnalytics(this.reportRequest).subscribe(cfg => {
      this.sessionsResponse = cfg;
      console.log(this.sessionsResponse)
    });
  }

  public getUsers (startDate, endDate) {
    this.setReportRequest(startDate, endDate, "ga:users");
    this.analyticsApi.getAnalytics(this.reportRequest).subscribe(cfg => {
      this.usersResponse = cfg;
      console.log(this.usersResponse)
    });
  }
}
