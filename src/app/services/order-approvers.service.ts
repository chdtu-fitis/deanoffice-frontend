import { Injectable } from '@angular/core';
import {OrderApprover} from '../models/order/OrderApprover';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {forObservable, forPromise} from "../components/shared/httpErrors";

@Injectable()
export class OrderApproversService {

  private approversUrl = `${environment.apiUrl}/orders`;



  constructor(private _httpClient: HttpClient) { }

  // public getApprovers(): BehaviorSubject<Array<OrderApprover>> {
  //   return this.approvers;
  // }
  public getApprovers(): Observable<OrderApprover[]> {
    return this._httpClient.get<OrderApprover[]>(`${this.approversUrl}/approvers`)
      .pipe(catchError(forObservable('Отримання підписантів', [])));
  }

  // approvers: BehaviorSubject<Array<OrderApprover>> = new BehaviorSubject([
  //   {fullName: "Pogor Vlad Vlad", faculty:{id:1, name: "IT", abbr:'', deanEng:'', active:true, nameEng:''}, position: 'bigBoss', id: 1, active: true},
  //   {fullName: "Tokar Max Max", faculty:{id:1, name: "IT", abbr:'', deanEng:'', active:true, nameEng:''}, position: 'bigBoss2', id: 2, active: true}
  // ])

  // public onAddOrderApprover(orderApprover: OrderApprover): void{
  //   let approvers = this.approvers.getValue() as Array<OrderApprover>
  //   approvers.push(orderApprover)
  //   this.approvers.next(approvers)
  // }
  public addOrderApprover(body: OrderApprover): Observable<any>{
    return this._httpClient.post<OrderApprover>(`${this.approversUrl}/approvers`, body, {} )
      .pipe(catchError(forObservable('Додавання нового підписанта', [])));
  }
  //
  // public delete(approverId): void{
  //   let approvers = this.approvers.getValue() as Array<OrderApprover>
  //   approvers = approvers.filter((approver) => approver.id != approverId)
  //   this.approvers.next(approvers)
  // }



}
