import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Specialization} from '../../../models/Specialization';

import {translations} from '../transtations';

const columns: string[] = [
  'name',
  'nameEng',
  'speciality.code',
  'speciality.name',
  'degree.name',
  'educationalProgramHeadName',
  'paymentFulltime',
  'paymentExtramural'
];

@Component({
  selector: 'app-specializations-table',
  templateUrl: './specializations-table.component.html',
  styleUrls: ['./specializations-table.component.scss']
})
export class SpecializationsTableComponent {
  @Input() rows: Specialization[];
  @Input() loading: boolean;
  @Output() onSelect: EventEmitter<Specialization[]> = new EventEmitter<Specialization[]>();
  selected: Specialization[] = [];
  columns = this.transformArrayToColumns();

  private transformArrayToColumns(): Object[] {
    const templatesMap = {
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

    return ['selected', ...columns].map(prop => {
      const col = templatesMap[prop];
      return {prop, name: translations[prop], ...col};
    });
  }

  getRowIdentity(row) {
    return row.id;
  }

  select({selected}) {
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

  handleSelect(specializations: Specialization[]) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...specializations);
    this.onSelect.emit(this.selected);
  }
}
