import {Component, OnInit} from '@angular/core';
import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';
import {StudentGroup} from "../../models/StudentGroup";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.scss']
})
export class ExamReportComponent implements OnInit {
  degrees: Degree[];
  groups: StudentGroup[];
  currentGroup: StudentGroup;


  constructor(private groupService: GroupService, private degreeService: DegreeService) { }

  ngOnInit() {
    this.degreeService.getDegrees()
      .subscribe(degrees => {
        this.degrees = degrees;
        this.onDegreeChange('1', '1');
      });

  }

  onDegreeChange(degreeId: string, year: string): void {
    this.groupService.getGroupsByDegreeAndYear(degreeId, year)
      .subscribe(groups => {
        this.groups = groups;
        this.currentGroup = groups[0];
        // this.onGroupChange(this.groups[0].id.toString());
      });
  }

  // onGroupChange(groupId: string): void {
  //   this.students = this.groups.find(x => x.id == Number(groupId)).studentDegrees;
  //   for (var student of this.students) {student.selected = true;}
  //   this.studentsSelected = true;
  // }

}
