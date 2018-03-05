import {Component, OnInit} from '@angular/core';
import {Degree} from '../../models/Degree';
import {DegreeService} from '../../services/degree.service';

@Component({
  selector: 'exam-report',
  templateUrl: './exam-report.component.html',
  styleUrls: ['./exam-report.component.scss']
})
export class ExamReportComponent implements OnInit {
  degrees: Degree[];

  constructor(private degreeService: DegreeService) {
  }

  ngOnInit() {
    this.degreeService.getDegrees()
      .subscribe(degrees => this.degrees = degrees);
  }

}
