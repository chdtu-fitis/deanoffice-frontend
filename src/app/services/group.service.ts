import {Injectable} from '@angular/core';
import {StudentGroup} from '../models/StudentGroup';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';
import {StudentDegree} from '../models/StudentDegree';
import {environment} from '../../environments/environment';

@Injectable()
export class GroupService {
  private groupsUrl = `${environment.apiUrl}/groups`;
  private groupsByDegreeUrl = this.groupsUrl + '/graduates';

  constructor(private http: HttpClient) {
  }

  // constructor() {
  //   this.groups = [];
  //   var group = new StudentGroup();
  //   group.id = 1;
  //   group.name = 'МКТ-1601';
  //   group.specialization = new Specialization();
  //   group.specialization.id = 1;
  //   group.specialization.name = 'Інформаційні управляючі системи і технології';
  //   group.specialization.degree = new Degree();
  //   group.specialization.degree.id = 3;
  //   group.specialization.degree.name = 'магістр';
  //   this.groups.push(group);
  //   group = new StudentGroup();
  //   group.id = 2;
  //   group.name = 'МІТП-1603';
  //   group.specialization = new Specialization();
  //   group.specialization.id = 2;
  //   group.specialization.name = 'Інформаційні технології проектування';
  //   group.specialization.degree = new Degree();
  //   group.specialization.degree.id = 3;
  //   group.specialization.degree.name = 'магістр';
  //   this.groups.push(group);
  // }

  getGroups(): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(this.groupsUrl);
  }

  getGroupsByDegree(degreeId: string): Observable<StudentGroup[]> {
    const url = `${this.groupsByDegreeUrl}?degreeId=${degreeId}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(
        catchError(this.handleError('getGroupsByDegree', []))
      );
  }

  getGroupsByDegreeAndYear(degreeId: string, year: string): Observable<StudentGroup[]> {
    const url = `${this.groupsUrl}/year?degreeId=${degreeId}&year=${year}`;
    return this.http.get<StudentGroup[]>(url)
      .pipe(
        catchError(this.handleError('getGroupsByDegree', []))
      );
  }

  getGroupStudents(groupId: string): Observable<StudentDegree[]> {

    const url = `${this.groupsUrl}/${groupId}/students`;
    return this.http.get<StudentDegree[]>(url)
      .pipe(
        catchError(this.handleError('getStudentsByGroup', []))
      );
  }

  getGroupsByFaculty(): Observable<StudentGroup[]> {
    return this.http.get<StudentGroup[]>(`http://localhost:8080/groups`)
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
