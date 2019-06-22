import {Component, OnInit} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {GoogleAuthService} from 'ng-gapi';
import {GoogleAnalyticsAuthService} from "../../services/google-analytics-auth.service";
import {AnalyticsApiService} from "../../services/analytics-api.service";
import {Chart} from 'chart.js';

@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  private reportRequest;
  private usersResponse;
  private sessionsResponse;
  private users = [3, 15, 12, 1, 4, 2, 13];
  private sessions = [4, 25, 23, 2, 6, 4, 37];
  public usersChart = {};
  public sessionsChart = {};
  private labels = ['...', '...', '...', '...', '...', '...'];

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

  public getSessions(startDate, endDate): object {
    this.analyticsApi.getAnalytics(startDate, endDate, "ga:sessions").subscribe(cfg => {
      this.sessionsResponse = cfg;
      console.log(this.sessionsResponse)
    });
    return this.sessionsResponse
  }

  public getUsers(startDate, endDate){
    this.analyticsApi.getAnalytics(startDate, endDate, "ga:sessions").subscribe(cfg => {
      this.usersResponse = cfg;
    });
  }

  public setSessions() {
    // this.users.push(this.getSessions('7daysAgo','today'));
    // this.users.push(respond.reports);
  }
  public setUsers() {
    // this.users.push(this.getSessions('7daysAgo','today'));
    // this.users.push(respond.reports);
  }

  public setCharts() {
    this.getUsers('today', 'today');
    console.log(this.usersResponse);
    // this.getSessions('7daysAgo','today');
    this.setUsersChart();
    this.setSessionsChart();
  }

  public setUsersChart() {
    this.usersChart = new Chart('usersCanvas', {
      type: 'line',
      data: {
        labels: [...this.labels, 'Today'],
        datasets: [{
          data: this.users,
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

  public setSessionsChart() {
    this.sessionsChart = new Chart('sessionsCanvas', {
      type: 'line',
      data: {
        labels: [...this.labels, 'Today'],
        datasets: [{
          data: this.sessions,
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
