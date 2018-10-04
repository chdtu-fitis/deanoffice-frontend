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
  selectedDegree: Degree;

  loadedGroups: StudentGroup[];
  groups: StudentGroup[];
  selectedGroups: StudentGroup[];

  isCheckedFullTime: boolean;
  isCheckedPartTime: boolean;

  years: Array<number>;
  selectedYear: number;

  studyYearsForDocument: Array<number>;
  selectedStudyYearForDocument: number;

  isBuildDocumentButtonDisabled = false;

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
          this.selectedDegree = this.degrees[0];
          this.handleDegreeChange();
        }
      });
  }

  handleDegreeChange(): void {
    this.selectedYear = 1;
    this.loadGroups();
  }

  handleYearChange(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getGroupsByDegreeAndYear(this.selectedDegree.id, this.selectedYear)
      .subscribe(groups => {
        if(groups) {
          this.loadedGroups = groups;
        } else {
          this.loadedGroups = [];
        }
        this.updateGroups();
      });
  }

  updateGroups(): void {
    this.groups = this.loadedGroups.filter((group) => {
      return this.isCheckedFullTime && group.tuitionForm.toString() == "FULL_TIME" ||
             this.isCheckedPartTime && group.tuitionForm.toString() == "EXTRAMURAL";
    });
    this.selectedGroups = this.groups;
    this.checkAllStudents();
    this.updateButtonLoad();
  }

  checkAllStudents(): void {
    for(let group of this.selectedGroups) {
      group.selected = true;
      for(let studentDegree of group.studentDegrees) {
        studentDegree.selected = true;
      }
    }
  }

  handleGroupsChange(): void {
    this.updateButtonLoad();
  }

  handleFullTimeChange(): void {
    if(!this.isCheckedPartTime) {
       this.isCheckedPartTime = true;
    }
    this.updateGroups();
  }

  handlePartTimeChange(): void {
    if(!this.isCheckedFullTime) {
       this.isCheckedFullTime = true;
    }
    this.updateGroups();
  }

  selectAllGroups(): void {
    this.selectedGroups = this.groups;
    this.checkAllStudents();
    this.updateButtonLoad();
  }

  checkAllStudentsOfGroup(isChecked: boolean, studentDegrees: StudentDegree[]): void {
    for(let studentDegree of studentDegrees) {
      studentDegree.selected = isChecked;
    }
    this.updateButtonLoad();
  }

  handleOnStudentCheckChange(group: StudentGroup): void {
    group.selected = this.isStudentsOfGroupChecked(group);
    this.updateButtonLoad();
  }

  isStudentsOfGroupChecked(group: StudentGroup): boolean {
    let isChecked = true;
    for(let studentDegree of group.studentDegrees) {
      if(!studentDegree.selected) {
        isChecked = false;
      }
    }
    return isChecked;
  }

  updateButtonLoad(): void {
    this.isBuildDocumentButtonDisabled = this.isAllStudentsUnchecked();
  }

  isAllStudentsUnchecked(): boolean {
    let isUnchecked = true;
    for(let group of this.selectedGroups) {
      for(let studentDegree of group.studentDegrees) {
        if(studentDegree.selected) {
          isUnchecked = false;
        }
      }
    }
    return isUnchecked;
  }

  buildPersonalFileGradesStatement(): void {
    let studentIds = [];
    for(let group of this.selectedGroups) {
      for(let studentDegree of group.studentDegrees) {
        if(studentDegree.selected) {
          studentIds.push(studentDegree.id);
        }
      }
    }
    this.personalFileGradesStatementLoading = true;
    this.personalFileGradesStatementService.buildPersonalFileGradesStatement(
      this.selectedStudyYearForDocument, studentIds
    ).subscribe(a => {
        this.personalFileGradesStatementLoading = false;
      }
    );
  }
}
