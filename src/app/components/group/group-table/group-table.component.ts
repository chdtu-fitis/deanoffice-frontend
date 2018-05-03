import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';

import { translations } from '../translations.js';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
  @Input('rows') rows: StudentGroup[];
  @ViewChild('tuitionFormTemplate') tuitionFormTemplate: TemplateRef<any>;
  @ViewChild('tuitionTermTemplate') tuitionTermTemplate: TemplateRef<any>;

  getColumns(): Object[] {
    const columns = [
      'name',
      'specialization.degree.name',
      'specialization.name',
      'creationYear',
      'tuitionForm',
      'tuitionTerm',
      'studySemesters',
      'studyYears',
      'beginYears'
    ];

    const templatesMap = {
      'tuitionForm': {cellTemplate: this.tuitionFormTemplate},
      'tuitionTerm': {cellTemplate: this.tuitionTermTemplate}
    };

    return columns.map(prop => {
      const column = templatesMap[prop];
      return { prop, name: translations[prop], ...column };
    });
  }

  getRowIdentity(row) {
    return row.id;
  }
}
