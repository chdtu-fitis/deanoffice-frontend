import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {combineLatest} from 'rxjs/observable/combineLatest';

import {GroupService} from '../../services/group.service';
import {Degree} from '../../models/degree.enum';
import {StudentGroup} from '../../models/StudentGroup';
import {StudyYearFinishService} from '../../services/study-year-finish.service';
import {TuitionForm} from '../../models/tuition-form.enum';
import {Utils} from '../shared/utils';

@Component({
  selector: 'finish-study-year',
  templateUrl: './finish-study-year.component.html',
  styleUrls: ['./finish-study-year.component.scss']
})
export class FinishStudyYearComponent implements OnInit {
  bachelorGroups: StudentGroup[];
  bachelorGroupsFullTime: StudentGroup[];
  bachelorGroupsExtramural: StudentGroup[];
  masterGroups: StudentGroup[];
  masterGroupsFullTime: StudentGroup[];
  masterGroupsExtramural: StudentGroup[];
  allGroups: StudentGroup[];
  tuitionForm = TuitionForm;
  form;

  constructor(private groupService: GroupService,
              private studyYearFinishService: StudyYearFinishService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      ids: '',
      expelDate: ['', Validators.required],
      orderDate: ['', Validators.required],
      orderNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
    const bachelorGroups$ = this.groupService.getGroupsByDegree(String(Degree.BACHELOR));
    const masterGroups$ = this.groupService.getGroupsByDegree(String(Degree.MASTER));
    combineLatest(bachelorGroups$, masterGroups$, (bachelorGroups, masterGroups) => ({bachelorGroups, masterGroups}))
      .subscribe(pair => {
        this.bachelorGroups = pair.bachelorGroups;
        this.masterGroups = pair.masterGroups;
        console.log(this.bachelorGroups);
        console.log(this.masterGroups);
        [this.bachelorGroupsFullTime, this.bachelorGroupsExtramural] = Utils.partition(
          this.bachelorGroups,
          group => this.tuitionForm[group.tuitionForm] === this.tuitionForm.FULL_TIME);
        [this.masterGroupsFullTime, this.masterGroupsExtramural] = Utils.partition(
          this.masterGroups,
          group => this.tuitionForm[group.tuitionForm] === this.tuitionForm.FULL_TIME);
        this.allGroups = this.bachelorGroups.concat(this.masterGroups);
        this.selectAllGroupsAndStudents();
      })
  }

  selectAllGroupsAndStudents(): void {
    for (const group of this.allGroups) {
      group.selected = true;
      for (const studentDegree of group.studentDegrees) {
        if (studentDegree.diplomaNumber) {
          studentDegree.selected = true;
        }
      }
    }
  }

  finish() {
    const selectedGroups = this.allGroups.filter(bachelorGroup => bachelorGroup.selected);
    const studentIds = [];
    for (const group of selectedGroups) {
      for (const studentDegree of group.studentDegrees) {
        if (studentDegree.selected) {
          studentIds.push(studentDegree.id);
        }
      }
    }
    this.form.controls.ids.setValue(studentIds);
    this.studyYearFinishService.finishStudyYear(this.form.value).subscribe(() => {
      console.log('submitted');
    });
  }
}
