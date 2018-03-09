import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentDegree} from '../models/StudentDegree';

@Injectable()
export class StudentService {
  private url = 'http://localhost:8080/students';

  constructor(private http: HttpClient) {
  }

  getInitialStudents() {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees`);
  }

  getStudents() {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees/more-detail`);
  }

}
