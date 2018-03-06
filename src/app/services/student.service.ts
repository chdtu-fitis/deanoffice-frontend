import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StudentService {
  private url = 'http://localhost:8080/students';

  constructor(private http: HttpClient) {
  }

  getInitialStudents() {
    // todo use proper type
    return this.http.get<any[]>(`${this.url}/degrees`);
  }

  getStudents() {
    return this.http.get<any[]>(`${this.url}/degrees/more-detail`);
  }

}
