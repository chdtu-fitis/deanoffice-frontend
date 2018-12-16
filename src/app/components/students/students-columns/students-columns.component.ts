import {
  Component, EventEmitter, OnInit, Output, ViewChild
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

import { translations } from '../translations';
import { defaultColumns, allColumns } from '../constants';
import { IAppModal } from '../../shared/modal.interface';

@Component({
  selector: 'app-students-columns',
  templateUrl: './students-columns.component.html',
  styleUrls: [ './students-columns.component.scss' ]
})
export class StudentsColumnsComponent implements OnInit, IAppModal {
  columns: Object = {};
  @ViewChild('modal') modal: ModalDirective;
  @Output() setColumns = new EventEmitter<string[]>();

  ngOnInit(): void {
    allColumns.forEach((col): any => {
      return this.columns[col] = defaultColumns.find((el): boolean => el === col);
    });
  }

  applyColumns(): void {
    const columns = Object.keys(this.columns).filter((key): boolean => this.columns[key]);
    this.modal.hide();
    this.setColumns.emit(columns);
  }

  resetColumns(): void {
    Object.keys(this.columns).forEach((key): void => {
      this.columns[key] = defaultColumns.find((el): boolean => el === key);
    });
    this.modal.hide();
    this.setColumns.emit(defaultColumns);
  }

  onChange(col): void {
    this.columns[col] = !this.columns[col];
  }

  getName(col): string {
    return translations[col] || col;
  }
}
