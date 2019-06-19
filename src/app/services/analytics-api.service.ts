import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {GoogleAnalyticsAuthService} from "./google-analytics-auth.service";

@Injectable()
export class AnalyticsApiService {

  private url = 'https://analyticsreporting.googleapis.com/v4/reports:batchGet';

  private httpOptions = {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY)
    })
  };

  constructor(private http: HttpClient) {
  }

  getAnalytics(body) {
    return this.http.post(this.url, body, this.httpOptions)
  }
}
