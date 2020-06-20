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

  private approversUrl = `${environment.apiUrl}/orders/approve-template`;

  constructor(private _httpClient: HttpClient) { }

  public getOrderApproversTemplates(active: boolean): Observable<OrderApproverTemplate[]> {
    const params =  new HttpParams().set('active', active.toString());
    return this._httpClient.get<OrderApproverTemplate[]>(`${this.approversUrl}`, {params})
      .pipe(catchError(forObservable('Отримання шаблонів підписантів', [])));
  }

  public createOrderApproversTemplate(body: OrderApproverTemplate): Observable<any> {
    const template = OrderApproverTemplate.prepareBody(body)
    return this._httpClient.post<OrderApproverTemplate>(`${this.approversUrl}`, template, {} )
      .pipe(catchError(forObservable('Створити новий шаблон підписантів', [])));
  }

  public deleteTemplate (id: number): Observable<any> {
    const url = `${this.approversUrl}/${id}`;
    return this._httpClient.delete(url).pipe(catchError(forObservable('Видалення шаблону підписантів', [])));
  }
}
