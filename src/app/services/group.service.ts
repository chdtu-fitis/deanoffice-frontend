import {Injectable} from '@angular/core';
import {StudentGroup} from '../models/StudentGroup';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {environment} from '../../environments/environment';

@Injectable()
export class GroupService {
  private groupsUrl = `${environment.apiUrl}/groups`;
  private groupsByDegreeUrl = this.groupsUrl + '/graduates';

  constructor(private http: HttpClient) {
  }

  getGroups(): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(`${this.groupsUrl}`);
  }

  getGroupsByDegree(degreeId: string): Observable<StudentGroup[]> {
    const url = `${this.groupsByDegreeUrl}?degreeId=${degreeId}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(
        catchError(this.handleError('getGroupsByDegree', []))
      );
  }

  getGroupsByDegreeAndYear(degreeId: string, year: string): Observable<StudentGroup[]> {
    const url = `${this.groupsUrl}/filter?degreeId=${degreeId}&year=${year}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(
        catchError(this.handleError('getGroupsByDegree', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    }
  }

}
