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

  fullTime: boolean;
  partTime: boolean;

  years: Array<number>;
  selectedYear: number;

  studyYearsForDocument: Array<number>;
  selectedStudyYearForDocument: number;

  personalFileGradesStatementLoading = false;

  constructor(private groupService: GroupService, private degreeService: DegreeService,
              private personalFileGradesStatementService: PersonalFileGradesStatementService) {
  }

  initStudyYearsForDocument() {
    var year = (new Date()).getFullYear();
    var month = (new Date()).getUTCMonth() + 1;

    if(month > 6) {
      this.selectedStudyYearForDocument = year - 1;
    } else {
      this.selectedStudyYearForDocument = year - 2;
    }

    this.studyYearsForDocument = [];
    for(var i = 0; i < 6; i++ ) {
      this.studyYearsForDocument.push(this.selectedStudyYearForDocument - i);
    }
  }

  ngOnInit() {
    this.initStudyYearsForDocument();

    this.fullTime = true;
    this.partTime = true;

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
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        this.groups = groups;
        this.currentGroups = this.groups;
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        if (groups) {
          this.groups = groups;
        }
        this.currentGroups = this.groups;
      });
  }

  onFullTimeChange(): void {
    if(!this.partTime) {
       this.partTime = true;
    }
  }

  onPartTimeChange(): void {
    if(!this.fullTime) {
       this.fullTime = true;
    }
  }

  onSelectAllGroups(): void {
    this.currentGroups = this.groups;
  }

  onPersonalFileGradesStatementBuild(): void {
    let groupIds = [];
    for(var currentGroup of this.currentGroups) {
        groupIds.push(currentGroup.id);
    }
    this.personalFileGradesStatementLoading = true;
    this.personalFileGradesStatementService.buildPersonalFileGradesStatement(this.selectedStudyYearForDocument, groupIds).subscribe(a => {
        this.personalFileGradesStatementLoading = false;
      }
    );
  }
}
