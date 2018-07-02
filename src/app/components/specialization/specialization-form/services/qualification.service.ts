import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../models/professional-qualification';
import {SPECIALIZATION_URL} from '../../../../services/specialization.service';
import {catchError, map} from 'rxjs/operators';
import {forObservable, forPromise} from '../../../shared/httpErrors';
import {environment} from '../../../../../environments/environment';
import {QualificationEvents} from '../models/qualification-events';
import {QualificationForSpecialization} from '../models/QualificationForSpecialization';
import {ResponseStatus} from "../enums/response-status.enum";

const QUALIFICATIONS_URL = `${environment.apiUrl}/professional-qualifications`;

@Injectable()
export class QualificationService {
  constructor(private _http: HttpClient) {
  }

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

  canEdit(specializationId: number): Observable<boolean> {
    return this._http
      .head(`${SPECIALIZATION_URL}/${specializationId}/professional-qualifications`, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<null>) => response.status === ResponseStatus.OK),
        catchError(forObservable('Перевірка можливості видалення кваліфікації', []))
      );
  }
}
