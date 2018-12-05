import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Specialization } from '../models/Specialization';
import { catchError } from 'rxjs/operators';
import { forObservable, forPromise } from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
export const SPECIALIZATION_URL: string = API_URL + '/specializations';

@Injectable()
export class SpecializationService {
  constructor(private _httpClient: HttpClient) {}

  public getSpecializations(actual: boolean = true): Observable<Specialization[]> {
    const params = new HttpParams().set('active', actual.toString());
    return this._httpClient.get<Specialization[]>(SPECIALIZATION_URL, { params: params })
      .pipe(catchError(forObservable('Отримання спеціалізацій', [])));
  }

  create(body: Specialization): Promise<any> {
    return this._httpClient.post(SPECIALIZATION_URL, body).toPromise()
      .catch(forPromise('Створення нової спеціалізації'));
  }

  delete(itemId: number): Promise<any> {
    return this._httpClient.delete(`${SPECIALIZATION_URL}/${itemId}`).toPromise()
      .catch(forPromise('Видалення спеціалізацій'));
  }

  getById(sourceId: number): Observable<Specialization> {
    return this._httpClient.get<Specialization>(`${SPECIALIZATION_URL}/${sourceId}`)
      .pipe(catchError(forObservable('Отриманная спеціалізації по Id', [])))
      .map(data => data as Specialization);
  }

  update(body: Specialization): Promise<any> {
    return this._httpClient.put(SPECIALIZATION_URL, body).toPromise()
      .catch(forPromise('Оновлення спеціалізації'));
  }
}
