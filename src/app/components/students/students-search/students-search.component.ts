import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {StudentDegree} from '../../../models/StudentDegree';

@Component({
    selector: 'app-students-search',
    templateUrl: './students-search.component.html',
    styleUrls: ['./students-search.component.scss'],
})
export class StudentsSearchComponent {
  searchForm;
  @Input() studentField: string;
  @Input() rows: StudentDegree[];
  @Output() searchResult = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: '',
    })
  }

  private deepFind(obj, path) {
    const paths = path.split('.');
    for (let i = 0; i < paths.length; i++) {
      obj = obj[paths[i]];
    }

    return obj;
  };

  searchStudent() {
    const value = this.searchForm.value.search.trim();
    const [surname, name, patronimic] = value.split(' ');
    if (!surname) {
      return;
    }
    const index = this.rows.find(row => {
      const student = this.deepFind(row, this.studentField);
      const isSurnameMatch = !surname || !!student.surname.match(new RegExp(`^${surname}`, 'i'));
      const isNameMatch = !name || !!student.name.match(new RegExp(`^${name}`, 'i'));
      const isPatronimicMatch = !patronimic || !!student.patronimic.match(new RegExp(`^${patronimic}`, 'i'));
      return isSurnameMatch && isPatronimicMatch && isNameMatch;
    });

    this.searchResult.emit(index);
  }
}
