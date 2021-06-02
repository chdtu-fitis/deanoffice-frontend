import { ConstantPool } from '@angular/compiler';
import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesYearParameters} from '../../../models/SelectiveCoursesYearParameters';

@Component({
  selector: 'year-parameters-table',
  templateUrl: './year-parameters-table.component.html',
  styleUrls: ['./year-parameters-table.component.scss']
})
export class YearParametersTableComponent implements OnInit {

  @Input() yearParameters: SelectiveCoursesYearParameters[];
  today: Date;
  isFirstPeriodFirstRound: boolean;
  isFirstPeriodBetweenFirstAndSecondRound: boolean;
  isFirstPeriodSecondRound: boolean;
  isSecondPeriodFirstRound: boolean;
  isSecondPeriodBetweenFirstAndSecondRound: boolean;
  isSecondPeriodSecondRound: boolean;

  constructor() { }

  ngOnInit() {
    this.today = new Date();
    this.isFirstPeriodFirstRound = (this.today >= new Date(this.yearParameters[0].firstRoundStartDate))
      && (this.today <= new Date(this.yearParameters[0].firstRoundEndDate));
    this.isFirstPeriodBetweenFirstAndSecondRound = (this.today > new Date(this.yearParameters[0].firstRoundEndDate))
      && (this.today < new Date(this.yearParameters[0].secondRoundStartDate));
    this.isFirstPeriodSecondRound = (this.today >= new Date(this.yearParameters[0].secondRoundStartDate))
      && (this.today <= new Date(this.yearParameters[0].secondRoundEndDate));
    this.isSecondPeriodFirstRound = (this.today >= new Date(this.yearParameters[1].firstRoundStartDate))
      && (this.today <= new Date(this.yearParameters[1].firstRoundEndDate));
    this.isSecondPeriodBetweenFirstAndSecondRound = (this.today > new Date(this.yearParameters[1].firstRoundEndDate))
      && (this.today < new Date(this.yearParameters[1].secondRoundStartDate));
    this.isSecondPeriodSecondRound = (this.today >= new Date(this.yearParameters[1].secondRoundStartDate))
      && (this.today <= new Date(this.yearParameters[1].secondRoundEndDate));
  }
}
