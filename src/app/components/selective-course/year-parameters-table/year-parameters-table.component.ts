import { ConstantPool } from '@angular/compiler';
import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesYearParameters} from '../../../models/SelectiveCoursesYearParameters';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {selectiveCourseRoutes} from '../selective-course.module';

@Component({
  selector: 'year-parameters',
  templateUrl: './year-parameters-table.component.html',
  styleUrls: ['./year-parameters-table.component.scss']
})
export class YearParametersTableComponent implements OnInit {

  yearParameters: SelectiveCoursesYearParameters;

  @Input() studyYear: string;

  constructor(private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.selectiveCourseService.getYearParameters(this.studyYear)
      .subscribe(yearParameters => {
        this.yearParameters = yearParameters;
      });
  }

}
