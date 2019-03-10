import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common'

import {StudentService} from '../../../services/student.service';
import {StudentDegree} from '../../../models/StudentDegree';
import {AcademicCertificateService} from '../../../services/academic-certificate.service';

import {StudentAllInfoComponent} from '../student-all-info/student-all-info.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';
import {StudentsTableComponent} from '../students-table/students-table.component';
import {expelledColumnDefs} from '../constants';

@Component({
  selector: 'app-expelled-students',
  templateUrl: './expelled-students.component.html',
  styleUrls: ['./expelled-students.component.scss'],
})
export class ExpelledStudentsComponent implements OnInit {
  rows: StudentDegree[] = [];
  columnDefs = expelledColumnDefs;
  rowsAll: StudentDegree[] = [];
  selected: StudentDegree[] = [];
  selectedAll: StudentDegree[] = [];
  academicCertificateLoading: boolean;
  searchForm: FormGroup;
  count;
  countAll;
  @ViewChild('studentAllInfo') studentAllInfo: StudentAllInfoComponent;
  @ViewChild('expelledStudentsTable') expelledStudentsTable: StudentsTableComponent;
  @ViewChild('allExpelledStudentsTable') allExpelledStudentsTable: StudentsTableComponent;

  constructor(private studentService: StudentService,
              private academicCertificateService: AcademicCertificateService,
              private fb: FormBuilder,
              private groupService: GroupService) {}

  ngOnInit() {
    this.studentService.getExpelledStudents().subscribe((students: StudentDegree[]) => {
      this.rows = students;
    });
    this.searchForm = this.fb.group({
      name: '',
      surname: '',
      startDate: [this.getStartDate(), Validators.required],
      endDate: ''
    });
  }

  getStartDate() {
    const date = new Date();
    date.setFullYear( date.getFullYear() - 7 );
    return new DatePipe('en-US').transform(date, 'y-MM-dd')
  }

  onSelectionChanged(selected) {
    this.selected = selected;
  }

  onAllSelectionChanged(selectedAll) {
    this.selectedAll = selectedAll;
  }

  onModelUpdated(count) {
    this.count = count;
  }

  onAllModelUpdated(count) {
    this.countAll = count;
  }

  onRenew() {
    this.expelledStudentsTable.onRenew(this.selected);
  }

  onRenewAll() {
    this.allExpelledStudentsTable.onRenew(this.selectedAll);
  }

  onSelect(index) {
    this.expelledStudentsTable.showByIndex(index);
  }

  onFormAcademicCertificate() {
    if (this.selected[0]) {
      this.academicCertificateLoading = true;
      this.academicCertificateService.buildAcademicCertificate(this.selected[0].id).subscribe(() => {
          this.academicCertificateLoading = false;
        }
      );
    }
  }

  onAllTabSelect() {
    this.groupService.getGroups(false).subscribe((groups: StudentGroup[]) => {
      this.studentAllInfo.groups = groups;
    });
  }

  onSearchAllExpelled() {
    this.studentService.searchExpelled(this.searchForm.value).subscribe((students: StudentDegree[]) => {
      this.rowsAll = students;
    });
  }
}
