import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../../models/Student';

@Component({
    selector: 'app-student-columns',
    templateUrl: './student-columns.component.html',
    styleUrls: ['./student-columns.component.css'],
})
export class StudentColumnsComponent {
  columns: Object = {};
  @Input() defaultColumns: Set<string>;
  @Input() set students([student]: Student[]) {
    Object.keys(student).forEach(col => {
      this.columns[col] = this.defaultColumns.has(col);
    })
  }
  @Output() setColumns = new EventEmitter<Array<string>>();

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
}
