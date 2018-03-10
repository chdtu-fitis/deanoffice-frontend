import {Component, Input} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {StudentDegree} from '../../../models/StudentDegree';

@Component({
    selector: 'app-students-search',
    templateUrl: './students-search.component.html',
    styleUrls: ['./students-search.component.scss'],
})
export class StudentsSearchComponent {
  searchForm;
  @Input() rows: StudentDegree[];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: '',
    })
  }

  searchStudent() {
    const value = this.searchForm.value.search.trim();
    const [surname, name, patronimic] = value.split(' ');
    if (!surname) {
      return;
    }
    const index = this.rows.findIndex(({ student }) => {
      const isSurnameMatch = !surname || student.surname === surname;
      const isNameMatch = !name || student.name === name;
      const isPatronimicMatch = !patronimic || student.patronimic === patronimic;
      return isSurnameMatch && isPatronimicMatch && isNameMatch;
    });

    const elem = document.querySelectorAll(`[ng-reflect-row-index="${index}"]`);
    if (elem && elem[0]) {
      elem[0].scrollIntoView();
    }
  }
}
