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

  select({ selected }) {
    this.handleSelect(selected)
  }

  activate({ type, row, column }) {
    if (type !== 'click' || column.prop === 'selected') {
      return;
    }
    const index = this.selected.findIndex(entry => entry.id === row.id);
    if (index > -1) {
      this.selected.splice(index, 1);
      this.onSelect.emit(this.selected);
    } else {
      this.handleSelect([...this.selected, row]);
    }
  }

  handleSelect(students: StudentDegree[]) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...students);
    this.onSelect.emit(this.selected);
  }
}
