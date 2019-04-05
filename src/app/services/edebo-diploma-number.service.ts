import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DiplomaListDTO} from '../models/edebo-diploma-number/DiplomaListDTO';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';
import {DiplomaNumberForSaveDTO} from '../models/edebo-diploma-number/DiplomaNumberForSaveDTO';
import {UpdateDiplomaAnalytics} from '../models/edebo-diploma-number/updateDiplomaAnalytics';

@Injectable()
export class EdeboDiplomaNumberService {
  private url = `${environment.apiUrl}/students/edebo-diploma-number-synchronization`;

  constructor(private _http: HttpClient) {
  }

  uploadDiplomaNumberDoc(data: FormData): Observable<DiplomaListDTO> {
    return this._http.post<DiplomaListDTO>(this.url, data)
      .pipe(catchError(forObservable<DiplomaListDTO>('upload diplomaNumbers')))
  }

  updateDiplomaData(data: DiplomaNumberForSaveDTO[]) {
    return this._http.put<UpdateDiplomaAnalytics>(this.url, data)
      .pipe(catchError(forObservable<UpdateDiplomaAnalytics>('save diplomaNumbers')))
  }

}
