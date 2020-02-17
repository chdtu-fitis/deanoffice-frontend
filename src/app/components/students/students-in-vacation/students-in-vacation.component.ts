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
  @ViewChild('studentsInVacationTable', { static: false }) studentsInVacationTable: StudentsTableComponent;
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

  onItemsCountUpdate(count) {
    this.count = count;
  }

  onSearch(student: StudentDegree) {
    this.studentsInVacationTable.showStudent(student);
  }

  onRenew() {
    this.studentsInVacationTable.onRenew(this.selected);
  }
}
