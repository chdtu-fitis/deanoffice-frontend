import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectiveCourse} from '../../../../models/SelectiveCourse';
import {TypeCycle} from '../../../../models/type-cycle.enum';
import {SelectiveCoursesYearParameters} from "../../../../models/SelectiveCoursesYearParameters";

@Component({
  selector: 'disqualifiable-courses-table',
  templateUrl: './disqualifiable-courses-table.component.html',
  styleUrls: ['./disqualifiable-courses-table.component.scss']
})
export class DisqualifiableCoursesTableComponent implements OnInit {

  @Input() selectiveCourses: SelectiveCourse[];
  @Input() yearParameters: SelectiveCoursesYearParameters[];

  typeCycle = TypeCycle;

  ngOnInit() {
  }
}
