import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../models/professional-qualification';
import {SPECIALIZATION_URL} from '../../../../services/specialization.service';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../../../shared/httpErrors';
import {environment} from '../../../../../environments/environment';
import {QualificationEvents} from '../specialization-qualification/models/qualification-events';
import {QualificationForSpecialization} from '../models/QualificationForSpecialization';

import 'rxjs/operator/map';

const QUALIFICATIONS_URL = `${environment.apiUrl}/professional-qualifications`;

@Injectable()
export class QualificationService {
  constructor(private _http: HttpClient) {}

  public getCurrent(specializationId: number): Observable<QualificationForSpecialization[]> {
    return this._http
      .get<QualificationForSpecialization[]>(`${SPECIALIZATION_URL}/${specializationId}/professional-qualifications`)
      .pipe(catchError(forObservable('Отримання кваліфікацій для спеціалізації', [])));
  }

  getAll(): Observable<ProfessionalQualification[]> {
    return this._http.get<ProfessionalQualification[]>(QUALIFICATIONS_URL)
      .pipe(catchError(forObservable('Отримання списку кваліфікацій', [])));
  }

  save(events: QualificationEvents) {
    return this._http
      .post(`${SPECIALIZATION_URL}/${events.specializationId}/professional-qualifications`, events)
      .toPromise().catch(forPromise('Зміна кваліфікацій для спеціалізації'));
  }

  create(body: ProfessionalQualification): Promise<ProfessionalQualification> {
    return this._http.post(QUALIFICATIONS_URL, body).toPromise()
      .catch(forPromise('Створення кваліфікації'))
      .then(data => data as ProfessionalQualification);
  }
}
