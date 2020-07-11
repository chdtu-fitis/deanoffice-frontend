import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

import {environment} from '../../environments/environment';
import {OrdersControls} from '../components/orders/orders-types';
import {orderReasons, orderTypes, tableData} from '../components/orders/moc';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';

@Injectable()
export class OrdersService {

  private ordersUrl = `${environment.apiUrl}/orders`;

  constructor(private _httpClient: HttpClient) {
  }

  public getOrders(orders: OrdersControls): Observable<any> {
    const url = `${this.ordersUrl}?activeStatus=${orders.signedOrders}&draftStatus=${orders.draftOrders}&rejectedOrder=${orders.rejectedOrders}`;
    // return this._httpClient.get<Order[]>(`url`).pipe(catchError(forObservable('Отримання наказів по факультету', [])));

    // of(tableData);
    let result = tableData.filter((order)=> {
      if (order.status === 'Підписаний' && orders.draftOrders) {
        return true;
      } else if (order.status === 'Проект' && orders.signedOrders) {
        return true;
      } else if (order.status === 'Відхилений' && orders.rejectedOrders) {
        return true;
      }
    });
    return of(result);
    // return this.http.get(ordersUrl)
    //   .pipe(catchError(forObservable('Отримання наказів по факультету', [])));
  }

  public getOrderTypes(): Observable<any> {
    // return this.http.get(`${this.ordersUrl}/order-type`)
    //   .pipe(catchError(forObservable('Отримання доступних типів наказу по факультету')))
    return of(orderTypes);
  }

  public getOrderParagraphJsonByType(orderType: string = 'STUDENT_EXPEL'): Observable<any> {
    return this._httpClient.get(`${this.ordersUrl}/paragraph`, { params: { orderType } })
      .pipe(catchError(forObservable('Отримання json об\'єкту параграфа певного типу наказу по факультету ', [])))
  }
}
