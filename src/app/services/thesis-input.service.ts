
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class ThesisInputService {

  private url = `${environment.apiUrl}/students/thesis-import`;
  constructor(private _http: HttpClient) {}

  uploadFile(formData: any): Observable<any> {
    return this._http.post(`${this.url}`, formData)
      .catch(this._errorHandler);
  }
  updateData(data: any): Observable<any> {
    return this._http.post(`${this.url}/update`, data)
      .catch(this._errorHandler);
  }

  _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return Observable.throw(error || 'Some Error on Server Occured');
  }

}
