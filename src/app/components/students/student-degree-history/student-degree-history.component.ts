import { Component } from '@angular/core';
import {Observable} from 'rxjs';

import {StudentService} from '../../../services/student.service';
import {Payment} from '../../../models/payment.enum';
import {ExpelsAndRenews} from './ExpelsAndRenews';


@Component({
  selector: 'student-degree-history',
  templateUrl: './student-degree-history.component.html',
  styleUrls: ['./student-degree-history.component.scss']
})
export class StudentDegreeHistoryComponent {
  studentDegreeHistory: Observable<ExpelsAndRenews[]>;
  payment = Payment;

  constructor(private studentService: StudentService) { }

  renderForm(id) {
    this.studentDegreeHistory = this.studentService.getStudentDegreeHistory(id);
  }

  getDate(date) {
    return new Date(date).getTime();
  }

}
