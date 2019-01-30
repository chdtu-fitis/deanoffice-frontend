import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DebtorBySpescialityModel} from '../models/reports/debtors-statistics/debtor-by-spesciality.model';

@Injectable()
export class DebtorStatisticsService {
  private url = `${environment.apiUrl}/report`;

  constructor(private _http: HttpClient) { }

  getDebts(): Observable<DebtorBySpescialityModel[]> {
    return this._http.get<DebtorBySpescialityModel[]>(`${this.url}/debtor`)
  }
}
