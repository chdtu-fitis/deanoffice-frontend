import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { translations } from '../translations.js';
import { defaultColumns, allColumns } from '../constants.js';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
    selector: 'app-students-columns',
    templateUrl: './students-columns.component.html',
    styleUrls: ['./students-columns.component.scss'],
})
export class StudentsColumnsComponent extends ModalComponent implements OnInit {
  columns: Object = {};
  @Output() setColumns = new EventEmitter<string[]>();

  ngOnInit() {
    allColumns.forEach(col => {
      return this.columns[col] = defaultColumns.find(el => el === col);
    });
  }

  applyColumns() {
    const columns = Object.keys(this.columns).filter(key => this.columns[key]);
    this.hideModal();
    this.setColumns.emit(columns);
  }

  resetColumns() {
    Object.keys(this.columns).forEach(key => {
      this.columns[key] = defaultColumns.find(el => el === key)
    });
    this.hideModal();
    this.setColumns.emit(defaultColumns);
  }

  onChange(col) {
    this.columns[col] = !this.columns[col];
  }

  getName(col) {
    return translations[col] || col;
  }
}
