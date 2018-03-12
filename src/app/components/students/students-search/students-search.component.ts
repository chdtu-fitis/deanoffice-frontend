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
      const isSurnameMatch = !surname || !!student.surname.match(new RegExp(surname, 'i'));
      const isNameMatch = !name || !!student.name.match(new RegExp(name, 'i'));
      const isPatronimicMatch = !patronimic || !!student.patronimic.match(new RegExp(patronimic, 'i'));
      return isSurnameMatch && isPatronimicMatch && isNameMatch;
    });

    const elem = document.querySelectorAll(`[ng-reflect-row-index="${index}"]`);
    if (elem && elem[0]) {
      elem[0].scrollIntoView();
    }
  }
}
