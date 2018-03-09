import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {StudentGroup} from '../../../models/StudentGroup';
import {StudentDegree} from '../../../models/StudentDegree';

@Component({
    selector: 'app-students-filters',
    templateUrl: './students-filters.component.html',
    styleUrls: ['./students-filters.component.scss'],
})
export class StudentsFiltersComponent {
  filters: FormGroup;
  @Input() groups: StudentGroup[];
  @Input() students: StudentDegree[];
  @Output() applyFilters = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.filters = fb.group({
      group: '',
      payment: this.fb.array([]),
      birthDate: '',
      birthMonth: ''
    })
  }

  setFilters() {
    console.log(this.filters.value);
    const form = this.filters.value;
    const students = this.students.filter(student => {
      const group = form.group.name;
      return group ? student.studentGroup.name === group : true;
    });

    this.applyFilters.emit(students);
  }

  resetFilters() {
    this.filters.reset();
    this.applyFilters.emit(this.students);
  }
}
