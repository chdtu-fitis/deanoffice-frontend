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

  showCharts = false;
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

  public generateDataRanges(startDate, endDate): object {
    let dataRanges = [
      {
        "startDate": startDate,
        "endDate": startDate
      },
      {
        "startDate": '6DaysAgo',
        "endDate": '6DaysAgo'
      },
      {
        "startDate": '5DaysAgo',
        "endDate": '5DaysAgo'
      },
      {
        "startDate": '4DaysAgo',
        "endDate": '4DaysAgo'
      },
      {
        "startDate": '3DaysAgo',
        "endDate": '3DaysAgo'
      },
      {
        "startDate": '2DaysAgo',
        "endDate": '2DaysAgo'
      },
      {
        "startDate": '1DaysAgo',
        "endDate": '1DaysAgo'
      },
      {
        "startDate": endDate,
        "endDate": endDate
      }];
    return dataRanges
  }

  public getSessions(dateRanges) {
    this.analyticsApi.getAnalytics(dateRanges, "ga:sessions").subscribe(cfg => {
      this.sessionsResponse = cfg;
      console.log(cfg);
      this.showCharts = true;
    });
  }

  public getUsers(dateRanges) {
    this.analyticsApi.getAnalytics(dateRanges, "ga:sessions").subscribe(cfg => {
      this.usersResponse = cfg;
      console.log(cfg);
      this.showCharts = true;
    });
  }

  public setSessions(dateRanges) {
    this.getSessions(dateRanges)
  }

  public setUsers(dateRanges) {
    this.getUsers(dateRanges);
  }

  public setCharts() {
    this.setUsers(this.generateDataRanges('7daysAgo', 'today'));
    this.setSessions(this.generateDataRanges('7daysAgo', 'today'));
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
