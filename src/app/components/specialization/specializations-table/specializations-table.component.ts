import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {Specialization} from '../../../models/Specialization';

import {tableColumnTranslations} from '../transtations';

const columns: string[] = [
  'name',
  'nameEng',
  'speciality',
  'degree.name',
  'educationalProgramHeadName'
];

@Component({
  selector: 'app-specializations-table',
  templateUrl: './specializations-table.component.html',
  styleUrls: ['./specializations-table.component.scss']
})
export class SpecializationsTableComponent implements OnInit {
  @Input() rows: Specialization[];
  @Input() loading: boolean;
  @Output() onSelect: EventEmitter<Specialization> = new EventEmitter<Specialization>();
  @ViewChild('specialityTemplate') specialityTemplate: TemplateRef<any>;
  selected: Specialization;
  columns = [];

  ngOnInit() {
    this.columns = this._transformArrayToColumns();
  }

  private _transformArrayToColumns(): Object[] {
    const templatesMap = {
      'speciality': {
        cellTemplate: this.specialityTemplate
      },
      'degree.name': {
        width: 100,
        resizable: false,
        canAutoResize: false
      },
      'selected': {
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      }
    };

    return ['selected', ...columns].map(prop => {
      return {prop, name: tableColumnTranslations[prop], ...templatesMap[prop]};
    });
  }

  getRowIdentity(row) {
    return row.id;
  }

  select({selected}) {
    this.handleSelect([...selected].pop())
  }

  handleSelect(specialization: Specialization) {
    this.selected = specialization;
    this.onSelect.emit(this.selected);
  }

  activate({ type, row, column }) {
    if (type !== 'click' || column.prop === 'selected') {
      return;
    }
    if (this.selected === row) {
      this.selected = null;
      this.onSelect.emit(this.selected);
    } else {
      this.handleSelect(row);
    }
  }

  getSelected() {
    return (this.selected) ? [this.selected] : [];
  }
}
