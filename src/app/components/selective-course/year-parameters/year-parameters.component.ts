import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCoursesYearParameters} from '../../../models/SelectiveCoursesYearParameters';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {selectiveCourseRoutes} from '../selective-course.module';

@Component({
  selector: 'year-parameters',
  templateUrl: './year-parameters.component.html',
  styleUrls: ['./year-parameters.component.scss']
})
export class YearParametersComponent implements OnInit {

  yearParameters: SelectiveCoursesYearParameters;

  @Input() studyYear: string;

  constructor(private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.selectiveCourseService.getYearParameters(this.studyYear)
      .subscribe(yearParameters => {
        this.yearParameters = yearParameters;
    });
  }

}
