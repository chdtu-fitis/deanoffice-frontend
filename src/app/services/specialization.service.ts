import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Specialization} from '../models/Specialization';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../components/shared/httpErrors';
import {CurrentUserService} from './auth/current-user.service';

const API_URL: string = environment.apiUrl;
export const SPECIALIZATION_URL: string = API_URL + '/specializations';
@Injectable()
export class SpecializationService {
  constructor(private _httpClient: HttpClient,
              private currentUserService: CurrentUserService) {}

  public getSpecializations(
    actual: boolean = true,
    facultyId: string = this.currentUserService.facultyId().toString()): Observable<Specialization[]> {
    const params = {actual: actual.toString(), facultyId};
    return this._httpClient.get<Specialization[]>(SPECIALIZATION_URL, {params})
      .pipe(catchError(forObservable('Отримання спеціалізацій', [])));
  }

  public getSpecializationsByActualAndFacultyIdAndDegreeId(
    actual: boolean = true,
    facultyId: string = this.currentUserService.facultyId().toString(),
    degreeId: string ): Observable<Specialization[]> {
    const params = {actual: actual.toString(), facultyId, degreeId};
    return this._httpClient.get<Specialization[]>(SPECIALIZATION_URL, {params})
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
      .map(data => data as Specialization)
  }

  update(body: Specialization): Promise<any> {
    return this._httpClient.put(SPECIALIZATION_URL, body).toPromise()
      .catch(forPromise('Оновлення спеціалізації'));
  }
}
