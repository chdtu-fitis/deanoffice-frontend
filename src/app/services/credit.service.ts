import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Course} from '../models/Course';

@Injectable()
export class CreditService {
  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {
  }

  public getCoursesWithWrongCredits(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.url}/credits/wrong`);
  }

  public fixCoursesWithWrongCredits(courses: Course[]) {
    return this.http.put(
      `${this.url}/credits/wrong`,
      null,
      {
        params: {
          ids: courses.map(value => value.id).join(','),
      }});
  }
}

