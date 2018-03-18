import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Degree} from '../models/Degree';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DegreeService {
  private degreesUrl = `${environment.apiUrl}/degrees`;

  constructor(private http: HttpClient) {
  }

  // getDegrees(): Degree[] {
  //   return [{id: 1, name: "бакалавр"},{id: 3, name: "магістр"}];
  // }

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(this.degreesUrl)
      .pipe(
        catchError(this.handleError('getDegrees', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed : ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
