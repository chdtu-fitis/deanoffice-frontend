import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Teacher} from '../models/Teacher';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../components/shared/httpErrors';


@Injectable()
export class TeacherService {
  private teachersUrl = `${environment.apiUrl}`;

  constructor(private _httpClient: HttpClient) {
  }

  public getTeachers(active: boolean): Observable<Teacher[]> {
    const params =  new HttpParams().set('active', active.toString());
    return this._httpClient.get<Teacher[]>(`${this.teachersUrl}/teachers`, {params})
      .pipe(catchError(forObservable('Отримання викладачів', [])));
  }

  public getTeachersShort(): Observable<Teacher[]> {
    const params =  new HttpParams().set('active', 'true');
    return this._httpClient.get<Teacher[]>(`${this.teachersUrl}/teachers-short`, {params})
      .pipe(catchError(forObservable('Отримання короткого списку викладачів', [])));
  }

  public createTeacher(body): Promise<any> {
    return this._httpClient.post(`${this.teachersUrl}/teachers`, body, {}).toPromise()
      .catch(forPromise('Створення нового викладача'));
  }
}
