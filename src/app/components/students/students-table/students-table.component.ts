import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { translations } from '../translations.js';

@Component({
    selector: 'app-students-table',
    templateUrl: './students-table.component.html',
    styleUrls: ['./students-table.component.css'],
})
export class StudentsTableComponent implements OnInit {
  @Input() set columns(cols: string[]) {
    this.cols = this.transformArrayToColumns(cols);
  }
  @Input() rows: Object[];
  @ViewChild('sexTemplate') sexTemplate: TemplateRef<any>;
  @ViewChild('paymentTemplate') paymentTemplate: TemplateRef<any>;
  cols: Object[];

  ngOnInit() {
  }

  private transformArrayToColumns(array: string[]): Object[] {
    return array.map(prop => {
      let cellTemplate;
      switch (prop) {
        case 'student.sex': cellTemplate = this.sexTemplate; break;
        case 'payment': cellTemplate = this.paymentTemplate; break;
      }
      return { prop, name: translations[prop], cellTemplate };
    });
  }
}
