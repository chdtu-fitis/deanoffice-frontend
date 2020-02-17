import {throwError, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable()
export class EdeboService {
  private url = `${environment.apiUrl}/students/edebo-synchronization`;
  constructor(private _http: HttpClient) { }

  uploadFile(formData: any): Observable<any> {
    return this._http.post(`${this.url}/process-file`, formData).pipe(catchError(this._errorHandler));
  }
  updateDb(data: any): Observable<any> {
    return this._http.post(`${this.url}/save`, data).pipe(catchError(this._errorHandler));
  }

   _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return throwError(error || 'Some Error on Server Occured');
  }
}
