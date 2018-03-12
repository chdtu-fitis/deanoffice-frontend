import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

import {translations} from '../translations.js';
import {defaultColumns, allColumns } from '../constants.js';
import {IAppModal} from '../../shared/modal.interface';

@Component({
    selector: 'app-students-columns',
    templateUrl: './students-columns.component.html',
    styleUrls: ['./students-columns.component.scss'],
})
export class StudentsColumnsComponent implements OnInit, IAppModal {
  columns: Object = {};
  @ViewChild('modal') modal: ModalDirective;
  @Output() setColumns = new EventEmitter<string[]>();

  ngOnInit() {
    allColumns.forEach(col => {
      return this.columns[col] = defaultColumns.find(el => el === col);
    });
  }

  applyColumns() {
    const columns = Object.keys(this.columns).filter(key => this.columns[key]);
    this.modal.hide();
    this.setColumns.emit(columns);
  }

  resetColumns() {
    Object.keys(this.columns).forEach(key => {
      this.columns[key] = defaultColumns.find(el => el === key)
    });
    this.modal.hide();
    this.setColumns.emit(defaultColumns);
  }

  onChange(col) {
    this.columns[col] = !this.columns[col];
  }

  getName(col) {
    return translations[col] || col;
  }
}
