
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
@Injectable()
export class ThesisInputService {

  private url = `${environment.apiUrl}/students/thesis-import`;
  constructor(private _http: HttpClient) {}

  uploadFile(formData: any): Observable<any> {
    return this._http.post(`${this.url}`, formData)
      .catch(this._errorHandler);
  }
  updateData(data: any): Observable<any> {
    return this._http.put(`${this.url}`, data)
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response): ErrorObservable {
    console.error('Error Occured: ' + error);
    return Observable.throw(error || 'Some Error on Server Occured');
  }

}
