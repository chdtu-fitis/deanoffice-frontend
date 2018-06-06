import { Injectable } from '@angular/core';
import {HandleError} from '../../../shared/httpErrors';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AcquiredCompetencies} from '../../../../models/AcquiredCompetencies';
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {SPECIALIZATION_URL} from '../../../../services/specialization.service';

const API_URL: string = environment.apiUrl;
const ACQUIRED_COMPETENCIES_URL: string = API_URL + '/acquired-competencies';

@Injectable()
export class AcquiredCompetenciesService {
  constructor(private _httpClient: HttpClient) { }

  getCompetencies(specializationId: number): Observable<any> {
    return this._httpClient.get(`${SPECIALIZATION_URL}/${specializationId}/competencies/ukr`);
  }

  updateCompetenciesUkr(competenciesId: number, competencies: string): Promise<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');
    return this._httpClient.put(`${ACQUIRED_COMPETENCIES_URL}/${competenciesId}/ukr`, competencies, {headers})
      .toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Оновлення компетенцій для спеціалізації (українською)'));
  }

  createCompetencies(competencies: AcquiredCompetencies): Promise<any> {
    return this._httpClient.post(`${ACQUIRED_COMPETENCIES_URL}`, competencies).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Створення компетенцій для спеціалізації'));
  }
}
