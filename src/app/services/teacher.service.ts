import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Teacher} from '../models/Teacher';
import {environment} from '../../environments/environment';
import {StudentGroup} from '../models/StudentGroup';
import {catchError} from 'rxjs/operators';
import {forObservable} from '../components/shared/httpErrors';

@Injectable()
export class TeacherService {
  private teachersUrl = `${environment.apiUrl}/teachers`;
  constructor(private http: HttpClient) {
  }

  getTeachers(onlyActual: boolean = true): Observable<Teacher[]> {
    const params = new HttpParams().set('only-active', onlyActual.toString());
    return this.http.get<Teacher[]>(`${this.teachersUrl}`, {params: params})
      .pipe(catchError(forObservable('Отримання груп', [])));
}
