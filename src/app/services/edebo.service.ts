import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EdeboService {
  private url = `${environment.apiUrl}/students/edebo-synchronization`;
  constructor(private _http: HttpClient) { }

  uploadFile(formData: any, params: any): Observable<any> {
    return this._http.post(`${this.url}/process-file`, formData, params)
      .catch(this._errorHandler);
  }
  updateDb(data: any): Observable<any> {
    return this._http.post(`${this.url}/save`, data)
      .catch(this._errorHandler);
  }

   _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return Observable.throw(error || 'Some Error on Server Occured');
  }
}
