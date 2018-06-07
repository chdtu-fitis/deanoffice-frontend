import {
  Component, EventEmitter, Input, Output, TemplateRef,
  ViewChild
} from '@angular/core';

import { translations } from '../translations.js';
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
  @Input() loading: boolean;
  @Input() selected: StudentDegree[] = [];
  @Output() onSelect = new EventEmitter<StudentDegree[]>();
  @Output() onToggleSelect = new EventEmitter<StudentDegree>();
  @ViewChild('sexTemplate') sexTemplate: TemplateRef<any>;
  @ViewChild('paymentTemplate') paymentTemplate: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  cols: Object[];
  focusedRowId: string;

  constructor() {
    this.getRowClass = this.getRowClass.bind(this);
    console.log(this.selected);
  }

  private transformArrayToColumns(array: string[]): Object[] {
    const templatesMap = {
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

    return ['selected', ...array].map(prop => {
      let col = templatesMap[prop];
      if (prop.match(/date/i)) {
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

  getRowClass(row) {
    return {
      'row-focused': row.id === this.focusedRowId,
    }
  }

  select({ selected }) {
    this.focusedRowId = null;
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.onSelect.emit(this.selected);
  }

  activate({ type, row, column }) {
    if (type === 'click' && column.prop !== 'selected') {
      this.focusedRowId = row.id;
    }
  }
}
