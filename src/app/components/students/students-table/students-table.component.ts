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
  @Input() selected: StudentDegree[] = [];
  @Output() onSelect = new EventEmitter();
  @ViewChild('sexTemplate') sexTemplate: TemplateRef<any>;
  @ViewChild('paymentTemplate') paymentTemplate: TemplateRef<any>;
  @ViewChild('dateTemplate') dateTemplate: TemplateRef<any>;
  cols: Object[];

  private transformArrayToColumns(array: string[]): Object[] {
    return array.map(prop => {
      let cellTemplate;
      switch (prop) {
        case 'student.sex':
          cellTemplate = this.sexTemplate; break;
        case 'student.birthDate':
        case 'diplomaDate':
        case 'supplementDate':
        case 'previousDiplomaDate':
        case 'protocolDate':
          cellTemplate = this.dateTemplate; break;
        case 'payment':
          cellTemplate = this.paymentTemplate; break;
      }
      return { prop, name: translations[prop], cellTemplate };
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
}
