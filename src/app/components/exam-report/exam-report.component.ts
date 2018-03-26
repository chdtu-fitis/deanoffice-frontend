import {Component, OnInit} from '@angular/core';
import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';

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
      });
  }
}
