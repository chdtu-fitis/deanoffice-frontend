import { Injectable } from '@angular/core';
import {ForeignCourses} from '../models/ForeignCourses';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class GroupsDifferentDialogService {

  constructor(private http: HttpClient) {
  }
  getForeignCourseAndGroups(): Observable<ForeignCourses[]> {
    return this.http.get<ForeignCourses[]>(`${environment.apiUrl}/courses/foreign/synchronization`);
  }

}
