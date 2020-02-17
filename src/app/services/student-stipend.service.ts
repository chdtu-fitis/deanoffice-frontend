import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {StudentStipendInfo} from '../models/student-stipend/StudentStipendInfo';
import {FileService} from './file-service';

@Injectable()
export class StudentStipendService {
  private studentStipendUrl = `${environment.apiUrl}/student-degree/stipend`;

  constructor(private http: HttpClient, private fileService: FileService) {
  }

  getStudentsStipendInfo(): Observable<StudentStipendInfo[]> {
    return this.http.get<StudentStipendInfo[]>(this.studentStipendUrl);
  }

  sendExtraPoints(array) {
    return this.http.post(`${this.studentStipendUrl}/extra-points-update`, array);
  }

  buildStudentRatingDocument(): any {
    return this.fileService.downloadFile(`${this.studentStipendUrl}/docx`);
  }
}
