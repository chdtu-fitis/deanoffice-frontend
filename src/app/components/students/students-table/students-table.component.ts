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

  private transformArrayToColumns(array: string[]): Object[] {
    return ['selected', ...array].map(prop => {
      let col = {};
      switch (prop) {
        case 'student.sex':
          col = { cellTemplate: this.sexTemplate }; break;
        case 'student.birthDate':
        case 'diplomaDate':
        case 'supplementDate':
        case 'previousDiplomaDate':
        case 'protocolDate':
          col = { cellTemplate: this.dateTemplate }; break;
        case 'payment':
          col = { cellTemplate: this.paymentTemplate }; break;
        case 'selected':
          col = {
            name: '',
            sortable: false,
            canAutoResize: false,
            draggable: false,
            resizable: false,
            headerCheckboxable: true,
            checkboxable: true,
            width: 30
          };
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
