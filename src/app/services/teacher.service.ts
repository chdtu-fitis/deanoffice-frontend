import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Teacher} from '../models/Teacher';
import {environment} from '../../environments/environment';

@Injectable()
export class TeacherService {
  private url = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {
  }

  getTeachers(): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.url}/teachers`);
  }
}
