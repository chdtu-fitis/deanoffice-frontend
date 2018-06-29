import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../models/professional-qualification';
import {SPECIALIZATION_URL} from '../../../../services/specialization.service';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../../../shared/httpErrors';
import {environment} from '../../../../../environments/environment';

import 'rxjs/operator/map';

const QUALIFACATIONS_URL = `${environment.apiUrl}/professional-qualifications`;

@Injectable()
export class QualificationService {
  constructor(private _http: HttpClient) {}

  public getLast(specializationId: number): Observable<ProfessionalQualification> {
    return this._http.get<ProfessionalQualification>(`${SPECIALIZATION_URL}/${specializationId}/professional-qualification`)
      .pipe(catchError(forObservable('Отримання кваліфікацій для спеціалізації', [])))
      .map(data => data as ProfessionalQualification);
  }

  getAll(): Observable<ProfessionalQualification[]> {
    return this._http.get<ProfessionalQualification[]>(QUALIFACATIONS_URL)
      .pipe(catchError(forObservable('Отримання списку кваліфікацій', [])));
  }

  setQualificationForSpecialization(specializationId: number, qualificationId: number) {
    return this._http
      .post(`${SPECIALIZATION_URL}/${specializationId}/professional-qualifications/${qualificationId}`, {})
      .toPromise().catch(forPromise('Зміна кваліфікацій для спеціалізації'));
  }
}
