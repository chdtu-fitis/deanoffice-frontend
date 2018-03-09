import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {StudentGroup} from '../../../models/StudentGroup';
import {StudentDegree} from '../../../models/StudentDegree';
import {months} from '../constants.js';

@Component({
    selector: 'app-students-filters',
    templateUrl: './students-filters.component.html',
    styleUrls: ['./students-filters.component.scss'],
})
export class StudentsFiltersComponent {
  filters: FormGroup;
  months: string[] = months;
  @Input() groups: StudentGroup[];
  @Input() students: StudentDegree[];
  @Output() applyFilters = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.filters = fb.group({
      group: '',
      payment: this.fb.array([]),
      birthDate: '',
      birthMonth: ''
    });
  }

  setFilters() {
    const students = this.students.filter(entry => this.filter(entry));
    this.applyFilters.emit(students);
  }

  resetFilters() {
    this.filters.reset();
    this.applyFilters.emit(this.students);
  }

  private filter(entry: StudentDegree): Boolean {
    const { group, payment, birthDate, birthMonth } = this.filters.value;
    const isGroupMatch = group ? entry.studentGroup.name === group : true;

    let isBirthDateMatch = true;
    if (birthDate) {
      isBirthDateMatch = entry.student.birthDate
        ? new Date(birthDate).getTime() === new Date(entry.student.birthDate).getTime()
        : false;
    }

    let isBirthMonthMatch = true;
    if (birthMonth) {
      isBirthMonthMatch = entry.student.birthDate
        ? birthMonth === new Date(entry.student.birthDate).getMonth()
        : false;
    }

    // todo filter by payment

    return isGroupMatch && isBirthDateMatch && isBirthMonthMatch;
  }
}
