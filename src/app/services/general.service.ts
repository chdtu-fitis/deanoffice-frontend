import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/do'
import {environment} from '../../environments/environment';

@Injectable()
export class GeneralService {
  private apiUrl = environment.apiUrl;
  private expelReasons;
  private renewReasons;

  constructor(private http: HttpClient) {
  }

  getStudentExpelReasons() {
    if (this.expelReasons) {
      return of(this.expelReasons);
    }
    return this.http.get(`${this.apiUrl}/reasons/fired-students`)
      .do(res => this.expelReasons = res);
  }

  getStudentRenewReasons() {
    if (this.renewReasons) {
      return of(this.renewReasons);
    }
    return this.http.get(`${this.apiUrl}/reasons/zarah`)
      .do(res => this.renewReasons = res);
  }
}
