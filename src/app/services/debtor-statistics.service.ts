import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {FileService} from './file-service';

import {SpecializationWithDebtorsStatistics} from '../models/reports/debtors-statistics/SpecializationWithDebtorsStatistics';

@Injectable()
export class DebtorStatisticsService {
  private url = `${environment.apiUrl}/report`;

  constructor(private fileService: FileService, private _http: HttpClient) { }

  getDebts(): Observable<SpecializationWithDebtorsStatistics[]> {
    return this._http.get<SpecializationWithDebtorsStatistics[]>(`${this.url}/debtor`)
  }

  buildDebtorsStatisticsReport(): any {
    const url = `${this.url}/debtor/export`;
    return this.fileService.downloadFile(url);
  }
}
