import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Position} from '../models/Position';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
const DEPARTMENT_URL: string = API_URL + '/positions';

@Injectable()
export class PositionService {

  constructor(private httpClient: HttpClient) { }

  getPositions(): Observable<Position[]> {
    return this.httpClient.get<Position[]>(DEPARTMENT_URL)
      .pipe(catchError(forObservable('Отримання списку посад', [])));
  }
}
