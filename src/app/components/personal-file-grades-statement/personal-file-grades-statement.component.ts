import { Component, OnInit } from '@angular/core';
import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';
import {StudentGroup} from "../../models/StudentGroup";
import {GroupService} from "../../services/group.service";
import {StudentDegree} from "../../models/StudentDegree";
import {PersonalFileGradesStatementService} from "../../services/personal-file-grades-statement.service";

@Component({
  selector: 'personal-file-grades-statement',
  templateUrl: './personal-file-grades-statement.component.html',
  styleUrls: ['./personal-file-grades-statement.component.scss']
})
export class PersonalFileGradesStatementComponent implements OnInit {
  degrees: Degree[];
  currentDegree: Degree;

  groups: StudentGroup[];
  currentGroups: StudentGroup[];

  isCheckedFullTime: boolean;
  isCheckedPartTime: boolean;

  years: Array<number>;
  selectedYear: number;

  studyYearsForDocument: Array<number>;
  selectedStudyYearForDocument: number;

  isButtonLoadDisabled = false;

  personalFileGradesStatementLoading = false;

  constructor(private groupService: GroupService, private degreeService: DegreeService,
              private personalFileGradesStatementService: PersonalFileGradesStatementService) {
  }

  initStudyYearsForDocument() {
    const year = (new Date()).getFullYear();
    const month = (new Date()).getUTCMonth() + 1;

    if(month > 6) {
      this.selectedStudyYearForDocument = year - 1;
    } else {
      this.selectedStudyYearForDocument = year - 2;
    }

    this.studyYearsForDocument = [];
    for(let i = 0; i < 6; i++ ) {
      this.studyYearsForDocument.push(this.selectedStudyYearForDocument - i);
    }
  }

  ngOnInit() {
    this.initStudyYearsForDocument();

    this.isCheckedFullTime = true;
    this.isCheckedPartTime = true;

    this.years = [1, 2, 3, 4, 5];
    this.selectedYear = 1;

    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        if (this.degrees) {
          this.currentDegree = this.degrees[0];
          this.onDegreeChange();
        }
      });
  }

  onDegreeChange(): void {
    this.selectedYear = 1;
    this.updateGroups();
  }

  onYearChange(): void {
    this.updateGroups();
  }

  updateGroups(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        if (groups) {
          this.groups = groups;
          this.filterGroups();
        }
        this.currentGroups = this.groups;
        this.checkAllStudents();
      });
  }

  checkAllStudents(): void {
    for(let currentGroup of this.currentGroups) {
      currentGroup.isChecked = true;
      for(let studentDegree of currentGroup.studentDegrees) {
        studentDegree.isChecked = true;
      }
    }
  }

  onCurrentGroupsChange(): void {
    this.updateButtonLoad();
  }

  onFullTimeChange(): void {
    if(!this.isCheckedPartTime) {
       this.isCheckedPartTime = true;
    }
    this.updateGroups();
  }

  onPartTimeChange(): void {
    if(!this.isCheckedFullTime) {
       this.isCheckedFullTime = true;
    }
    this.updateGroups();
  }

  filterGroups(): void {
    this.groups = this.groups.filter(function (group) {
      if(this.isCheckedFullTime && group.tuitionForm.toString() == "FULL_TIME") {
        return true;
      }
      if(this.isCheckedPartTime && group.tuitionForm.toString() == "EXTRAMURAL") {
        return true;
      }
    }, this);
  }

  onSelectAllGroups(): void {
    this.currentGroups = this.groups;
    this.checkAllStudents();
    this.updateButtonLoad();
  }

  onCheckAllStudentsOfGroup(isChecked: boolean, studentDegrees: StudentDegree[]): void {
    for(let studentDegree of studentDegrees) {
      studentDegree.isChecked = isChecked;
    }
    this.updateButtonLoad();
  }

  onCheckStudent(currentGroup: StudentGroup): void {
    currentGroup.isChecked = this.isStudentsOfGroupChecked(currentGroup);
    this.updateButtonLoad();
  }

  isStudentsOfGroupChecked(currentGroup: StudentGroup): boolean {
    let isChecked = true;
    for(let studentDegree of currentGroup.studentDegrees) {
      if(!studentDegree.isChecked) {
        isChecked = false;
      }
    }
    return isChecked;
  }

  updateButtonLoad(): void {
    this.isButtonLoadDisabled = this.isAllStudentsUnchecked();
  }

  isAllStudentsUnchecked(): boolean {
    let isUnchecked = true;
    for(let currentGroup of this.currentGroups) {
      for(let studentDegree of currentGroup.studentDegrees) {
        if(studentDegree.isChecked) {
          isUnchecked = false;
        }
      }
    }
    return isUnchecked;
  }

  onPersonalFileGradesStatementBuild(): void {
    let studentIds = [];
    for(let currentGroup of this.currentGroups) {
      for(let studentDegree of currentGroup.studentDegrees) {
        if(studentDegree.isChecked) {
          studentIds.push(studentDegree.student.id);
        }
      }
    }
    this.personalFileGradesStatementLoading = true;
    this.personalFileGradesStatementService.buildPersonalFileGradesStatement(this.selectedStudyYearForDocument, studentIds).subscribe(a => {
        this.personalFileGradesStatementLoading = false;
      }
    );
  }
}
