import {Component, OnInit} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {GoogleAuthService} from 'ng-gapi';
import {GoogleAnalyticsAuthService} from "../../services/google-analytics-auth.service";
import {AnalyticsApiService} from "../../services/analytics-api.service";
import { Chart } from 'chart.js';

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
  public usersChart = {};
  public sessionsChart = {};


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

  public getUsers (startDate, endDate): object {
    this.setReportRequest(startDate, endDate, "ga:users");
    this.analyticsApi.getAnalytics(this.reportRequest).subscribe(cfg => {
      this.usersResponse = cfg;
      console.log(this.usersResponse)
    });
    return this.usersResponse
  }

  public setSessions(){
    let respond = {
      "reports": [
        {
          "columnHeader": {
            "metricHeader": {
              "metricHeaderEntries": [
                {
                  "name": "ga:sessions",
                  "type": "INTEGER"
                }
              ]
            }
          },
          "data": {
            "rows": [
              {
                "metrics": [
                  {
                    "values": [
                      "39"
                    ]
                  }
                ]
              }
            ],
            "totals": [
              {
                "values": [
                  "39"
                ]
              }
            ],
            "rowCount": 1,
            "minimums": [
              {
                "values": [
                  "39"
                ]
              }
            ],
            "maximums": [
              {
                "values": [
                  "39"
                ]
              }
            ]
          }
        }
      ]
    };
    // this.users.push(this.getSessions('7daysAgo','today'));
    this.users.push(respond.reports);
  }

  public setCharts (){
    // this.getUsers('today','today');
    // this.getSessions('today','today');
    this.setUsersChart();
    this.setSessionsChart();
  }

  public setUsersChart (){
    this.usersChart = new Chart('usersCanvas', {
      type: 'line',
      data: {
        labels: ['...','...','...','...','...','...','Today'],
        datasets: [{
          data: [3,15,12,1,4,2,13],
          label: "Users",
          borderColor: "#3e95cd",
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Users for last week'
        }
      }
    });
  }

  public setSessionsChart (){
    this.sessionsChart = new Chart('sessionsCanvas', {
      type: 'line',
      data: {
        labels: ['...','...','...','...','...','...','Today'],
        datasets: [{
          data: [4,25,23,2,6,4,37],
          label: "Sessions",
          borderColor: "#cd683d",
          fill: false
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Sessions for last week'
        }
      }
    });
  }

}
