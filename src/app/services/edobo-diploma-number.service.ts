import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DiplomaListDTO} from '../models/edebo-diploma-number/DiplomaListDTO';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';

@Injectable()
export class EdoboDiplomaNumberService {
  private url = `${environment.apiUrl}/student/edebo-diploma-number-synchronization`;

  constructor(private _http: HttpClient) {
  }

  uploadDiplomaNumberDoc(file: Blob): Observable<DiplomaListDTO> {
    return this._http.post<DiplomaListDTO>(this.url, file).pipe(catchError(forObservable<DiplomaListDTO>('')))
  }
}
