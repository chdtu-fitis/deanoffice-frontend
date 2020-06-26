import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {environment} from '../../environments/environment';
import {OrdersControls} from '../components/orders/orders-types';
import {orderReasons, orderTypes, tableData} from '../components/orders/moc';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';

@Injectable()
export class OrdersService {

  private url = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {
  }

  public getOrders(orders: OrdersControls): Observable<any> {
    const url = `${this.url}?activeStatus=${orders.activeOrder}&draftStatus=${orders.draftOrder}&rejectedOrder=${orders.rejectedOrder}`;

    return of(tableData);
    // return this.http.get(url)
    //   .pipe(catchError(forObservable('Отримання наказів по факультету', [])));
  }

  public getOrderTypes(): Observable<any> {
    // return this.http.get(`${this.url}/order-type`)
    //   .pipe(catchError(forObservable('Отримання доступних типів наказу по факультету')))
    return of(orderTypes);
  }

  public getOrderParagraphJsonByType(orderType: string = 'STUDENT_EXPEL'): Observable<any> {
    return this.http.get(`${this.url}/paragraph`, { params: { orderType } })
      .pipe(catchError(forObservable('Отримання json об\'єкту параграфа певного типу наказу по факультету ', [])))
  }
}
