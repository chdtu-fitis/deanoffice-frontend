import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Specialization} from '../models/Specialization';
import {catchError} from 'rxjs/operators';
import {HandleError} from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
const SPECIALIZATION_URL = API_URL + '/specializations';

@Injectable()
export class SpecializationService {
  constructor(private httpClient: HttpClient) { }

  public getSpecializations(): Observable<Specialization[]> {
    return this.httpClient.get<Specialization[]>(SPECIALIZATION_URL)
      .pipe(catchError(HandleError.forObservable('Отримання спеціалізацій', [])));
  }
}
