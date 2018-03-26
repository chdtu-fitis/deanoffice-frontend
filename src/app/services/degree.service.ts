import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Degree} from '../models/Degree';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class DegreeService {
  private degreesUrl = `${environment.apiUrl}/degrees`;

  constructor(private http: HttpClient) {
  }

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(this.degreesUrl)
      .pipe(
        catchError(this.handleError('getDegrees', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    }
  }
}
