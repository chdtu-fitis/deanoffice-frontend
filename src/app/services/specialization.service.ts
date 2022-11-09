import {map, catchError} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Specialization} from '../models/Specialization';
import {forObservable, forPromise} from '../components/shared/httpErrors';
import {CurrentUserService} from './auth/current-user.service';

const API_URL: string = environment.apiUrl;
export const SPECIALIZATION_URL: string = API_URL + '/specializations';

@Injectable()
export class SpecializationService {
  constructor(private _httpClient: HttpClient,
              private currentUserService: CurrentUserService) {}

  public getSpecializations(
    active: boolean = true): Observable<Specialization[]> {
    const params = {active: active.toString()};
    return this._httpClient.get<Specialization[]>(SPECIALIZATION_URL, {params})
      .pipe(catchError(forObservable('Отримання спеціалізацій', [])));
  }

  public getSpecializationsByActualAndFacultyIdAndDegreeId(
    active: boolean = true,
    facultyId: string = this.currentUserService.facultyId().toString(),
    degreeId: string ): Observable<Specialization[]> {
    const params = {active: active.toString(), facultyId, degreeId};
    return this._httpClient.get<Specialization[]>(SPECIALIZATION_URL, {params})
      .pipe(catchError(forObservable('Отримання спеціалізацій', [])));
  }

  create(body: Specialization): Promise<any> {
    body.active = true;
    return this._httpClient.post(SPECIALIZATION_URL, body).toPromise()
      .catch(forPromise('Створення нової освітньої програми'));
  }

  delete(itemId: number): Promise<any> {
    return this._httpClient.delete(`${SPECIALIZATION_URL}/${itemId}`).toPromise()
      .catch(forPromise('Видалення освітньої програми'));
  }

  getById(sourceId: number): Observable<Specialization> {
    return this._httpClient.get<Specialization>(`${SPECIALIZATION_URL}/${sourceId}`).pipe(
      catchError(forObservable('Отриманная освітньої програми за Id', [])),
      map(data => data as Specialization)
    )
  }

  update(body: Specialization): Promise<any> {
    return this._httpClient.put(`${SPECIALIZATION_URL}/${body.id}`, body).toPromise()
      .catch(forPromise('Оновлення освітньої програми'));
  }

  restore(itemId: number): Observable<any> {
    const body = new HttpParams().set('specializationId', itemId.toString());
    const url = `${SPECIALIZATION_URL}/restore`;
    return this._httpClient.put(url, body);
  }
}
