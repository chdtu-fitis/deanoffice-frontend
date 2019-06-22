import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GoogleAnalyticsAuthService} from "./google-analytics-auth.service";

@Injectable()
export class AnalyticsApiService {

  private viewID = "196449903";
  private url = 'https://analyticsreporting.googleapis.com/v4/reports:batchGet';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + sessionStorage.getItem(GoogleAnalyticsAuthService.SESSION_STORAGE_KEY)
    })
  };

  constructor(private http: HttpClient) {
  }

  setReportRequestBody(startDate, endDate, expression): object {
    return {
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

  getAnalytics(startDate, endDate, expression) {
    let body = this.setReportRequestBody(startDate, endDate, expression);
    return this.http.post(this.url, body, this.httpOptions)
  }
}
