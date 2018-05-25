import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Specialization} from '../models/Specialization';
import {catchError} from 'rxjs/operators';
import {HandleError} from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
const SPECIALIZATION_URL = API_URL + '/specializations';

@Injectable()
export class SpecializationService {
  constructor(private httpClient: HttpClient) { }

  public getSpecializations(actual: boolean = true): Observable<Specialization[]> {
    const params = new HttpParams().set('active', actual.toString());
    return this.httpClient.get<Specialization[]>(SPECIALIZATION_URL, {params: params})
      .pipe(catchError(HandleError.forObservable('Отримання спеціалізацій', [])));
  }

  create(body: Specialization): Promise<any> {
    return this.httpClient.post(SPECIALIZATION_URL, body).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Створення нової спеціалізації'));
  }

  delete(itemIds: number[]): Promise<any> {
    return this.httpClient.delete(`${SPECIALIZATION_URL}/${itemIds}`).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Видалення спеціалізацій'));
  }

  getById(sourceId: number): Observable<Specialization> {
    return this.httpClient.get<Specialization>(`${SPECIALIZATION_URL}/${sourceId}`)
      .pipe(catchError(HandleError.forObservable('Отриманная спеціалізації по Id', [])))
      .map(data => data as Specialization)
  }

  update(body: Specialization): Promise<any> {
    return this.httpClient.put(SPECIALIZATION_URL, body).toPromise()
      .catch((error: Error) => HandleError.forPromise(error, 'Оновлення спеціалізації'));
  }
}
