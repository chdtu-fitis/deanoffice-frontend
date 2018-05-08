import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Department} from '../models/Department';
import {catchError} from 'rxjs/operators';
import {HandleError} from '../components/shared/httpErrors';

const API_URL: string = environment.apiUrl;
const DEPARTMENT_URL: string = API_URL + '/departments';

@Injectable()
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(DEPARTMENT_URL)
      .pipe(catchError(HandleError.forObservable('Отримання списку кафедр', [])));
  }
}
