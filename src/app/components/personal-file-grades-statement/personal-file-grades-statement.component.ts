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
  currentGroup: StudentGroup;
  students: StudentDegree[];

  years: Array<number>;
  selectedYear: number;

  personalFileGradesStatementLoading = false;

  constructor(private groupService: GroupService, private degreeService: DegreeService,
              private personalFileGradesStatementService: PersonalFileGradesStatementService) {
  }

  ngOnInit() {
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
        if (this.groups) {
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
        }
      });
  }

  onYearChange(): void {
    this.groupService.getGroupsByDegreeAndYear(this.currentDegree.id, this.selectedYear)
      .subscribe(groups => {
        if (groups) {
          this.groups = groups;
          this.currentGroup = groups[0];
          this.students = this.currentGroup.studentDegrees;
        }
      });
  }

  onGroupChange(): void {
    this.students = this.currentGroup.studentDegrees;
  }

  onPersonalFileGradesStatementBuild(): void {
    let groupIds = [];
    groupIds.push(this.currentGroup.id);
    this.personalFileGradesStatementLoading = true;
    this.personalFileGradesStatementService.buildPersonalFileGradesStatement(2017, groupIds).subscribe(a => {
        this.personalFileGradesStatementLoading = false;
      }
    );
  }
}
