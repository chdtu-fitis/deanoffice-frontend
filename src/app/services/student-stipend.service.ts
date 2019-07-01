import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {StudentStipendInfo} from "../models/student-stipend/StudentStipendInfo";

@Injectable()
export class StudentStipendService {
  private studentStipendUrl = `${environment.apiUrl}/student-degree/stipend`;

  constructor(private http: HttpClient) {
  }

  getStudentsStipendInfo(): Observable<StudentStipendInfo[]> {
    return this.http.get<StudentStipendInfo[]>(this.studentStipendUrl);
  }
  sendExtraPoints(array) {
    return this.http.post(`${this.studentStipendUrl}/extra-points-update`, array);
  }
}
