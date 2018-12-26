import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forObservable, forPromise} from '../components/shared/httpErrors';

@Injectable()
export class StudentStipendService {
  private studentStipendUrl = `${environment.apiUrl}/`;

  constructor(private http: HttpClient) {
  }
}
