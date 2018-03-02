import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { StudentService } from '../../services/student.service';
import { Student } from '../../models/Student';
import { translations } from './translations.js';
import { defaultColumns } from './constants.js';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: Student[];
  columns: Object[] = [];
  defaultColumns: Set<string> = new Set(defaultColumns);
  isAllDataLoaded: boolean;
  @ViewChild('sexTemplate') sexTemplate: TemplateRef<any>;
  @ViewChild('paymentTemplate') paymentTemplate: TemplateRef<any>;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getInitialStudents()
      .subscribe(students => {
        this.students = students;
        this.setColumns(Array.from(this.defaultColumns.keys()));
      })
  }

  setColumns(columns: string[]) {
    if (!this.isAllDataLoaded) {
      this.studentService.getStudents().subscribe(students => {
        this.students = students;
        this.isAllDataLoaded = true;
      });
    }
    this.columns = this.transformArrayToColumns(columns);
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
