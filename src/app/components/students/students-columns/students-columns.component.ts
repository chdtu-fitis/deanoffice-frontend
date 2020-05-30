import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

import {defaultColumnDefs, allColumnDefs } from '../constants';

@Component({
    selector: 'app-students-columns',
    templateUrl: './students-columns.component.html',
    styleUrls: ['./students-columns.component.scss'],
})
export class StudentsColumnsComponent implements OnInit {
  selectedColumns;
  allColumnDef;
  @Output() setColumns = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.allColumnDef = allColumnDefs;
  }

  applyColumns() {
    this.bsModalRef.hide();
    this.setColumns.emit(this.selectedColumns);
  }

  resetColumns() {
    this.bsModalRef.hide();
    this.setColumns.emit(defaultColumnDefs);
  }

  isChecked(field) {
    return this.selectedColumns.find(selectedColumn => selectedColumn.field === field);
  }

  onChange(col) {
    const index = this.selectedColumns.findIndex(selectedColumn => selectedColumn.field === col.field);
    if (index === -1) {
      this.selectedColumns.push(col);
    } else {
      this.selectedColumns.splice(index, 1);
    }
  }
}
