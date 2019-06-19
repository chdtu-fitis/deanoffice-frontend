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

  private viewID = '196449903';
  private reportRequest = [
    {
      viewId: this.viewID,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today'
        }
      ],
      metrics: [
        {
          expression: 'ga:sessions'
        }
      ]
    }
    ];
  private users;
  private sessions;

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

  getSessions (){
    this.reportRequest = [
      {
        viewId: this.viewID,
        dateRanges: [
          {
            startDate: '7daysAgo',
            endDate: 'today'
          }
        ],
        metrics: [
          {
            expression: 'ga:sessions'
          }
        ]
      }
    ];
    console.log(this.reportRequest);
    this.analyticsApi.getAnalytics(this.reportRequest).subscribe(cfg => {
      this.sessions = cfg;
      console.log(this.sessions)
    });
  }

  public getUsers () {
    this.reportRequest = [
      {
        viewId: this.viewID,
        dateRanges: [
          {
            startDate: '7daysAgo',
            endDate: 'today'
          }
        ],
        metrics: [
          {
            expression: 'ga:users'
          }
        ]
      }
    ];
    console.log(this.reportRequest);
    this.analyticsApi.getAnalytics(this.reportRequest).subscribe(cfg => {
      this.users = cfg;
      console.log(this.users)
    });
  }
}
