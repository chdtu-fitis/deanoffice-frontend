import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StudyYearFinishService {

  private url = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {
  }

  finishStudyYear(finishStudyYearData) {
    return this.http.post(`${this.url}/study-year-finish`, finishStudyYearData);
  }

}
