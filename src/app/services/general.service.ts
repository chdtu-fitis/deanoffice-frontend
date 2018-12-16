import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment';
import { OrderReason } from '../models/OrderReason';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GeneralService {
  private apiUrl = environment.apiUrl;
  private expelReasons: OrderReason[];
  private academicVacationReasons: OrderReason[];

  constructor(private http: HttpClient) {
  }

  getStudentExpelReasons(): Observable<OrderReason[]> {
    if (this.expelReasons) {
      return of(this.expelReasons);
    }
    return this.http.get<OrderReason[]>(`${this.apiUrl}/reasons/fired-students`)
      .do((res: OrderReason[]): OrderReason[] => this.expelReasons = res);
  }

  getAcademicVacationReasons(): Observable<OrderReason[]> {
    if (this.academicVacationReasons) {
      return of(this.academicVacationReasons);
    }
    return this.http.get<OrderReason[]>(`${this.apiUrl}/reasons/vidp-students`);
  }
}
