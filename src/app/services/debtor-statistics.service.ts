import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SpecializationWithDebtorsStatistics} from '../models/reports/debtors-statistics/SpecializationWithDebtorsStatistics';

@Injectable()
export class DebtorStatisticsService {
  private url = `${environment.apiUrl}/report`;

  constructor(private _http: HttpClient) { }

  getDebts(): Observable<SpecializationWithDebtorsStatistics[]> {
    return this._http.get<SpecializationWithDebtorsStatistics[]>(`${this.url}/debtor`)
  }
}
