import {Injectable, Input} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EdeboService {
  private url = `${environment.apiUrl}/students/edebo-synchronization`;
  constructor(private _http: HttpClient) { }

  public uploadFile(formdata: any) {
    return this._http.post(this.url, formdata)
      .catch(this._errorHandler);
  }

  public _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return Observable.throw(error || 'Some Error on Server Occured');
  }
}
