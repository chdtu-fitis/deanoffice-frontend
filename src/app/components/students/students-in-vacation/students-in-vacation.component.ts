import {Component, OnInit, ViewChild} from '@angular/core';

import { StudentService } from '../../../services/student.service';
import {academicVacationColumnDefs} from '../constants';
import { StudentDegree } from '../../../models/StudentDegree';
import {StudentsTableComponent} from '../students-table/students-table.component';

@Component({
  selector: 'app-students-in-vacation',
  templateUrl: './students-in-vacation.component.html',
  styleUrls: ['./students-in-vacation.component.scss'],
})
export class StudentsInVacationComponent implements OnInit {
  @ViewChild('studentsInVacationTable') studentsInVacationTable: StudentsTableComponent;
  rows: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  loading: boolean;
  columnDefs = academicVacationColumnDefs;
  count;

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudentsInAcademicVacation().subscribe((students: StudentDegree[]) => {
      this.rows = students;
    });
  }

  onSelectionChanged(selected) {
    this.selected = selected;
  }

  onModelUpdated(count) {
    this.count = count;
  }

  onSelect(index) {
    this.studentsInVacationTable.showByIndex(index);
  }

  onRenew() {
    this.studentsInVacationTable.onRenew(this.selected);
  }
}
