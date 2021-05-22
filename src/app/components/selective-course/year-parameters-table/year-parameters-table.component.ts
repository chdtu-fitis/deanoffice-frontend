import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesYearParameters} from '../../../models/SelectiveCoursesYearParameters';

@Component({
  selector: 'year-parameters-table',
  templateUrl: './year-parameters-table.component.html',
  styleUrls: ['./year-parameters-table.component.scss']
})
export class YearParametersTableComponent implements OnInit {

  @Input() yearParameters: SelectiveCoursesYearParameters[];

  constructor() { }

  ngOnInit() {
  }


}
