import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

import studentsMock from '../mock/students';
import initialStudentsMock from '../mock/students-initial';

@Injectable()
export class StudentService {

  constructor() { }

  getInitialStudents() {
    return of(initialStudentsMock)
  }

  getStudents() {
    return of(studentsMock)
  }

}
