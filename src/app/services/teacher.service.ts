import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Teacher} from '../models/Teacher';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TeacherService {
  constructor(private http: HttpClient) {
  }

  getTeachers() {
    return this.http.get<Teacher>('/coursesforgroups/teachers').toPromise();
  }

}
