import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {environment} from '../../environments/environment';

@Injectable()
export class DiplomaSupplementService {
  private documentsUrl = `${environment.apiUrl}/documents`;

  constructor(private http: HttpClient) {
  }

  buildDiplomaSupplement(studentId: string): void {
    const url = `${this.documentsUrl}/diplomas/supplements/studentdegrees/${studentId}`;
    window.open(url, "_blank");
  }

  buildGradePercent(groupId: string): void {
    const url = `${this.documentsUrl}/percentagereport/groups/${groupId}`;
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
