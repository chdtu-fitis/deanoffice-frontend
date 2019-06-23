import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GoogleAnalyticsAuthService} from "./google-analytics-auth.service";
import {environment} from '../../environments/environment';

@Injectable()
export class AnalyticsApiService {

  private viewID = environment.view_id;
  private url = 'https://analyticsreporting.googleapis.com/v4/reports:batchGet';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY)
    })
  };

  constructor(private http: HttpClient) {
  }

  setReportRequestBody(dateRanges, expression): object {
    return {
      "reportRequests": [
        {
          "viewId": this.viewID,
          "dateRanges": dateRanges,
          "metrics": [
            {
              "expression": expression
            }
          ]
        }
      ]
    }
  }

  getAnalytics(dateRanges, expression) {
    let body = this.setReportRequestBody(dateRanges, expression);
    return this.http.post(this.url, body, this.httpOptions)
  }
}
