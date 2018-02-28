import { Component, EventEmitter, Input, Output } from '@angular/core';
import { translations } from '../translations';

@Component({
    selector: 'app-student-columns',
    templateUrl: './student-columns.component.html',
    styleUrls: ['./student-columns.component.css'],
})
export class StudentColumnsComponent {
  columns: Object = {};
  @Input() defaultColumns: Set<string>;
  @Input() set allColumns(columns: string[]) {
    columns.forEach(col => {
      this.columns[col] = this.defaultColumns.has(col);
    });
  }
  @Output() setColumns = new EventEmitter<string[]>();

  applyColumns() {
    const columns = Object.keys(this.columns).filter(key => this.columns[key]);
    this.setColumns.emit(columns);
  }

  resetColumns() {
    Object.keys(this.columns).forEach(key => {
      this.columns[key] = this.defaultColumns.has(key);
    });
    this.setColumns.emit(Array.from(this.defaultColumns.keys()));
  }

  onChange(col) {
    this.columns[col] = !this.columns[col];
  }

  getName(col) {
    return translations[col] || col;
  }
}
