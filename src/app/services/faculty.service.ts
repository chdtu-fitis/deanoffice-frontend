import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Faculty} from '../models/Faculty';
import {environment} from '../../environments/environment';

@Injectable()
export class FacultyService {
  private facultiesUrl = `${environment.apiUrl}/faculties`;

  constructor(private http: HttpClient) { }

  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`${this.facultiesUrl}`);
  }

}
