import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from '../models/Department';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
export const DEPARTMENT_URL: string = API_URL + '/departments';

@Injectable()
export class DepartmentService {

  private departmentsUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {
  }

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${DEPARTMENT_URL}/all`)
      .pipe(catchError(forObservable('Отримання повного списку кафедр', [])));
  }

  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(DEPARTMENT_URL)
      .pipe(catchError(forObservable('Отримання списку кафедр', [])));
  }

  getDepartmentsByActive(active: boolean): Observable<Department[]> {
    const params = new HttpParams().set('active', active.toString());
    return this.httpClient.get<Department[]>(DEPARTMENT_URL, {params})
      .pipe(catchError(forObservable('Отримання списку кафедр', [])));
  }

  create(body): Promise<any> {
    return this.httpClient.post(DEPARTMENT_URL, body).toPromise()
      .catch(forPromise('Створення нової кафедри'));
  }

  updateDepartment(body): Promise<any> {
    return this.httpClient.put(`${this.departmentsUrl}/departments/${body.id}`, body).toPromise()
      .catch(forPromise('Оновлення інформації про кафедру'));
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${DEPARTMENT_URL}/${id}`)
      .pipe(catchError(forObservable('Видалення кафедри')))
  }

  restore(id: number): Observable<any> {
    const body = new HttpParams().set('departmentId', id.toString());
    const url = `${DEPARTMENT_URL}/restore`;
    return this.httpClient.put(url, body);
  }
}
