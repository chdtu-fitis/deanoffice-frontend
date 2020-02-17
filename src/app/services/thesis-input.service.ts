import {throwError, Observable} from 'rxjs';

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
@Injectable()
export class ThesisInputService {

  private url = `${environment.apiUrl}/students/thesis-import`;
  constructor(private _http: HttpClient) {}

  uploadFile(formData: any): Observable<any> {
    return this._http.post(`${this.url}`, formData).pipe(catchError(this._errorHandler));
  }
  updateData(data: any): Observable<any> {
    return this._http.put(`${this.url}`, data).pipe(catchError(this._errorHandler));
  }

  _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return throwError(error || 'Some Error on Server Occured');
  }

}
