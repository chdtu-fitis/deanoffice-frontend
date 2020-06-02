import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class OrderReasonService {

  private url = `${environment.apiUrl}/reasons`;
  constructor(private http: HttpClient) { }

  public getExpelOrderReasons(): Observable<any> {
    return this.http.get(`${this.url}/fired-students`)
      .pipe(catchError(forObservable('Отримання причин наказів по факультету', [])));
  }
}
