import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../models/professional-qualification';
import {SPECIALIZATION_URL} from '../../../../services/specialization.service';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../../../shared/httpErrors';
import {environment} from '../../../../../environments/environment';
import {QualificationEvents} from '../specialization-qualification/models/qualification-events';

import 'rxjs/operator/map';

const QUALIFACATIONS_URL = `${environment.apiUrl}/professional-qualifications`;

@Injectable()
export class QualificationService {
  constructor(private _http: HttpClient) {}

  public getCurrent(specializationId: number): Observable<ProfessionalQualification[]> {
    return this._http.get<ProfessionalQualification[]>(`${SPECIALIZATION_URL}/${specializationId}/professional-qualifications`)
      .pipe(catchError(forObservable('Отримання кваліфікацій для спеціалізації', [])));
  }

  getAll(): Observable<ProfessionalQualification[]> {
    return this._http.get<ProfessionalQualification[]>(QUALIFACATIONS_URL)
      .pipe(catchError(forObservable('Отримання списку кваліфікацій', [])));
  }

  save(events: QualificationEvents) {
    return this._http
      .post(`${SPECIALIZATION_URL}/${events.specializationId}/professional-qualifications`, events)
      .toPromise().catch(forPromise('Зміна кваліфікацій для спеціалізації'));
  }

  create(body: ProfessionalQualification): Promise<ProfessionalQualification> {
    return this._http.post(QUALIFACATIONS_URL, body).toPromise()
      .catch(forPromise('Створення кваліфікації'))
      .then(data => data as ProfessionalQualification);
  }
}
