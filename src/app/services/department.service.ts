import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Department} from '../models/Department';
import {catchError} from 'rxjs/operators';
import {forObservable, forPromise} from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
const DEPARTMENT_URL: string = API_URL + '/departments';

@Injectable()
export class DepartmentService {

  private departmentsUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {
  }

  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(DEPARTMENT_URL)
      .pipe(catchError(forObservable('Отримання списку кафедр', [])));
  }

  create(body): Promise<any> {
    return this.httpClient.post(DEPARTMENT_URL, body).toPromise()
      .catch(forPromise('Створення нової кафедри'));

  }

  updateDepartment(body): Promise<any> {
    return this.httpClient.put(`${this.departmentsUrl}/departments`, body).toPromise()
      .catch(forPromise('Оновлення інформації про кафедру'));
  }

  delete(id: number): Observable<Department> {
    return this.httpClient.delete<Department>(`${DEPARTMENT_URL}/${id}`)
      .pipe(catchError(forObservable<Department>('Видалення кафедри')))
  }
}
