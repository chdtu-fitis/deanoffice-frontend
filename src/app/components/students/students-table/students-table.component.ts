import {
  Component, EventEmitter, Input, Output, TemplateRef,
  ViewChild
} from '@angular/core';

import { translations } from '../translations';
import { StudentDegree } from '../../../models/StudentDegree';

@Component({
    selector: 'app-students-table',
    templateUrl: './students-table.component.html',
    styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent {
  @Input() set columns(cols: string[]) {
    this.cols = this.transformArrayToColumns(cols);
  }
  @Input() rows: StudentDegree[];
  @Input() selected: StudentDegree[] = [];
  @Output() onSelect = new EventEmitter<StudentDegree[]>();
  @Output() onToggleSelect = new EventEmitter<StudentDegree>();
  @ViewChild('sexTemplate') sexTemplate: TemplateRef<any>;
  @ViewChild('paymentTemplate') paymentTemplate: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  cols: Object[];
  templatesMap = {
    'student.sex': { cellTemplate: this.sexTemplate },
    'payment': { cellTemplate: this.paymentTemplate },
    'selected': {
      name: '',
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizable: false,
      headerCheckboxable: true,
      checkboxable: true,
      width: 30
    },
  };

  private transformArrayToColumns(array: string[]): Object[] {
    return ['selected', ...array].map(prop => {
      let col = this.templatesMap[prop];
      if (prop.match(/Date/)) {
        col = {cellTemplate: this.dateTemplate};
      }
      return { prop, name: translations[prop], ...col };
    });
  }

  getDate(date) {
    return new Date(date).getTime();
  }

  getRowIdentity(row) {
    return row.id;
  }

  select({ selected }) {
    this.onSelect.emit(selected);
  }

  activate({ type, row, column }) {
    if (type !== 'click' || column.prop === 'selected') {
      return;
    }
    this.onToggleSelect.emit(row);
  }
}
