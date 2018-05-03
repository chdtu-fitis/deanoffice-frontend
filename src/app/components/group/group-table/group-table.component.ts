import {Component, Input, OnInit} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';

import { translations } from '../translations.js';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
  @Input('rows') rows: StudentGroup[];

  getColumns(): Object[] {
    const columns = [
      'name',
      'degree.name',
      'specialization.name',
      'creationYear',
      'tuitionForm',
      'tuitionTerm',
      'studySemesters',
      'studyYears',
      'beginYears'
    ];

    return columns.map(prop => {
      return { prop, name: translations[prop] };
    });
  }

  getRowIdentity(row) {
    return row.id;
  }
}
