import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StudentDegree} from '../models/StudentDegree';
import {environment} from '../../environments/environment';

@Injectable()
export class StudentService {
  private url = `${environment.apiUrl}/students`;

  constructor(private http: HttpClient) {
  }

  getInitialStudents() {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees`);
  }

  getStudents() {
    return this.http.get<StudentDegree[]>(`${this.url}/degrees/more-detail`);
  }

  addStudent(studentDegree) {
    console.log('post', studentDegree);
    // return this.http.post(`${this.url}/degrees/`, studentDegree);
  }
}
