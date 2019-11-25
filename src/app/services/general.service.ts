import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class GeneralService {
  private apiUrl = environment.apiUrl;
  private expelReasons;
  private academicVacationReasons;

  constructor(private http: HttpClient) {
  }

  getStudentExpelReasons() {
    if (this.expelReasons) {
      return of(this.expelReasons);
    }
    return this.http.get(`${this.apiUrl}/reasons/fired-students`).pipe(
      tap(res => this.expelReasons = res)
    );
  }

  getAcademicVacationReasons() {
    if (this.academicVacationReasons) {
      return of(this.academicVacationReasons);
    }
    return this.http.get(`${this.apiUrl}/reasons/vidp-students`)
  }
}
