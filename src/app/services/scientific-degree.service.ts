import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ScientificDegree} from '../models/ScientificDegree';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';

@Injectable()
export class ScientificDegreeService {
  private scientificDegreeUrl = `${environment.apiUrl}/scientific-degrees`;

  constructor(private http: HttpClient) {}

  getScientificDegrees(): Observable<ScientificDegree[]> {
    return this.http.get<ScientificDegree[]>(this.scientificDegreeUrl)
      .pipe(catchError(forObservable('Отримання списку наукових ступенів', [])));
  }
}
