import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {StudentService} from '../../../services/student.service';
import {Payment} from '../../../models/payment.enum';
import {ExpelsAndRenews} from '../../../models/ExpelsAndRenews';


@Component({
  selector: 'student-degree-history',
  templateUrl: './student-degree-history.component.html',
  styleUrls: ['./student-degree-history.component.scss']
})
export class StudentDegreeHistoryComponent {
  studentHistory: Observable<ExpelsAndRenews[]>;
  payment = Payment;

  constructor(private studentService: StudentService) { }

  renderForm(id) {
    this.studentHistory = this.studentService.getStudentDegreeHistory(id);
  }

}
