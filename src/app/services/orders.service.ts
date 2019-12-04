import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {OrdersControls} from '../components/orders/orders-types';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {of} from 'rxjs/observable/of';
import {tableData} from '../components/orders/moc';

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
}
