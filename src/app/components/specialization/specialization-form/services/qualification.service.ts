import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
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

  create(body: ProfessionalQualification, andSet: boolean = false, specializationId?: number): Promise<ProfessionalQualification> {
    const params = this.getParamsForCreate(andSet, specializationId);
    return this._http.post(QUALIFACATIONS_URL, body, {params}).toPromise()
      .catch(forPromise('Створення та зміна кваліфікації'))
      .then(data => data as ProfessionalQualification);
  }

  private getParamsForCreate(andSet: boolean, specializationId: number): HttpParams {
    if (andSet) {
      return new HttpParams()
        .set('and-set', andSet.toString())
        .set('specialization-id', specializationId.toString());
    } else {
      return new HttpParams();
    }
  }
}
