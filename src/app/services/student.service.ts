import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import studentsMock from '../mock/students';
import { Student } from '../models/Student';

@Injectable()
export class StudentService {

  constructor() { }

  getStudents(): Observable<Student[]> {
    return of(studentsMock)
  }

}
