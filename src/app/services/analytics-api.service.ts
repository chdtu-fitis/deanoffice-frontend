import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {GoogleAnalyticsAuthService} from "./google-analytics-auth.service";

@Injectable()
export class AnalyticsApiService {

  private url = 'https://analyticsreporting.googleapis.com/v4/reports:batchGet?access_token=' + sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY)+'&key=[YOUR_API_KEY]';

  private httpOptions = {headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY)
    })
  };

  constructor(private http: HttpClient) {
  }

  getAnalytics(body) {
    console.log(this.httpOptions);
    return this.http.post(this.url, body, this.httpOptions)
  }
}
