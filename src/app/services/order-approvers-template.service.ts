import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {forObservable} from "../components/shared/httpErrors";
import {OrderApproverTemplate} from "../models/order/OrderApproverTemplate";
import {OrderApprover} from "../models/order/OrderApprover";

@Injectable()
export class OrderApproversTemplateService {

  private approversUrl = `${environment.apiUrl}/orders/approve`;

  constructor(private _httpClient: HttpClient) { }

  public getOrderApproversTemplates(active: boolean): Observable<OrderApproverTemplate[]> {
    const params =  new HttpParams().set('active', active.toString());
    return this._httpClient.get<OrderApproverTemplate[]>(`${this.approversUrl}/template`, {params})
      .pipe(catchError(forObservable('Отримання шаблонів підписантів', [])));
  }

  public createOrderApproversTemplate(body: OrderApproverTemplate): Observable<any>{
    return this._httpClient.post<OrderApproverTemplate>(`${this.approversUrl}/template`, body, {} )
      .pipe(catchError(forObservable('Створити новий шаблон підписантів', [])));
  }
}
