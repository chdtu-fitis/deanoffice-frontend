import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Specialization} from '../models/Specialization';
import {catchError} from 'rxjs/operators';
import {HandleError} from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
const SPECIALIZATION_URL: string = API_URL + '/specializations';
const ACQUIRED_COMPETENCIES_URL: string = API_URL + '/acquired-competencies';

@Injectable()
export class SpecializationService {
  constructor(private _httpClient: HttpClient) { }

  public getSpecializations(actual: boolean = true): Observable<Specialization[]> {
    const params = new HttpParams().set('active', actual.toString());
    return this._httpClient.get<Specialization[]>(SPECIALIZATION_URL, {params: params})
      .pipe(catchError(HandleError.forObservable('Отримання спеціалізацій', [])));
  }

  create(body: Specialization): Promise<any> {
    return this._httpClient.post(SPECIALIZATION_URL, body).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Створення нової спеціалізації'));
  }

  delete(itemId: number): Promise<any> {
    return this._httpClient.delete(`${SPECIALIZATION_URL}/${itemId}`).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Видалення спеціалізацій'));
  }

  getById(sourceId: number): Observable<Specialization> {
    return this._httpClient.get<Specialization>(`${SPECIALIZATION_URL}/${sourceId}`)
      .pipe(catchError(HandleError.forObservable('Отриманная спеціалізації по Id', [])))
      .map(data => data as Specialization)
  }

  getCompetencies(specializationId: number): Observable<any> {
    return this._httpClient.get(`${SPECIALIZATION_URL}/${specializationId}/competencies/ukr`);
  }

  update(body: Specialization): Promise<any> {
    return this._httpClient.put(SPECIALIZATION_URL, body).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Оновлення спеціалізації'));
  }

  updateCompetenciesUkr(competenciesId: number, competencies: string): Promise<any> {
    return this._httpClient.put(`${ACQUIRED_COMPETENCIES_URL}/${competenciesId}/ukr`, competencies).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Оновлення компетенцій спеціалізації (українською)'));
  }
}
