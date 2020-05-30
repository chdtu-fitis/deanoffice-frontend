import { Injectable } from '@angular/core';
import {OrderApprover} from '../models/order/OrderApprover';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {forObservable, forPromise} from "../components/shared/httpErrors";
import {Teacher} from "../models/Teacher";

@Injectable()
export class OrderApproversService {

  private approversUrl = `${environment.apiUrl}/orders`;

  constructor(private _httpClient: HttpClient) { }

  public getApprovers(active: boolean): Observable<OrderApprover[]> {
    const params =  new HttpParams().set('active', active.toString());
    return this._httpClient.get<OrderApprover[]>(`${this.approversUrl}/approvers`, {params})
      .pipe(catchError(forObservable('Отримання підписантів', [])));
  }

  public addOrderApprover(body: OrderApprover): Observable<any>{
    return this._httpClient.post<OrderApprover>(`${this.approversUrl}/approvers`, body, {} )
      .pipe(catchError(forObservable('Додавання нового підписанта', [])));
  }

  public deleteApprover (id: number): Observable<Object> {
    const url = `${this.approversUrl}/approvers/${id}`;
    return this._httpClient.delete(url).pipe(catchError(forObservable('Видалення підписанта', [])));
  }

  public restoreApprover (id: number): Observable<Object>  {
    const url = `${this.approversUrl}/approvers/${id}/restore`;
    return this._httpClient.put(url, null);
  }
}

