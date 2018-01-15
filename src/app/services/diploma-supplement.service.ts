import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {Student} from '../models/Student';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';

@Injectable()
export class DiplomaSupplementService {
  private diplomaSupplementUrl = 'http://localhost:8080/diplsuppl';

  constructor(private http: HttpClient) {
  }

  buildDiplomaSupplement(studentId: string): void {
    const url = `${this.diplomaSupplementUrl}/students/${studentId}`;
    window.open(url, "_blank");
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
