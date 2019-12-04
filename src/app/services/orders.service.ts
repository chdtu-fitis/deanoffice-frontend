import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {OrdersControls} from '../components/orders/orders-types';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {of} from 'rxjs/observable/of';

@Injectable()
export class OrdersService {

  private url = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {
  }

  public getOrders(orders: OrdersControls): Observable<any> {
    const url = `${this.url}?activeStatus=${orders.activeOrder}&draftStatus=${orders.draftOrder}&rejectedOrder=${orders.rejectedOrder}`;

    return of([
      {number: '15H0O-T',  type: 'Про переведення', date: new Date().toISOString(), status: 'Активний'},
      {number: '75PO-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Проект'},
      {number: '75EG-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'}
    ]);
    // return this.http.get(url)
    //   .pipe(catchError(forObservable('Отримання наказів по факультету', [])));
  }
}
