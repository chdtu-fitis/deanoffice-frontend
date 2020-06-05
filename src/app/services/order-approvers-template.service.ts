import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {OrderApprover} from "../models/order/OrderApprover";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {forObservable} from "../components/shared/httpErrors";

@Injectable()
export class OrderApproversTemplateService {

  private approversUrl = `${environment.apiUrl}/orders`;

  constructor(private _httpClient: HttpClient) { }

  public addOrderApproversTemplate(body: OrderApprover): Observable<any>{
    return this._httpClient.post<OrderApprover>(`${this.approversUrl}/approvers`, body, {} )
      .pipe(catchError(forObservable('Додавання нового підписанта', [])));
  }

}
