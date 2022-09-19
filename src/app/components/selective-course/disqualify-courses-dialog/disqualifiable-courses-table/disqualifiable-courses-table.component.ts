import {Component, Input, OnInit} from '@angular/core';
import {SelectiveCourse} from '../../../../models/SelectiveCourse';
import {TypeCycle} from '../../../../models/TypeCycle';

@Component({
  selector: 'disqualifiable-courses-table',
  templateUrl: './disqualifiable-courses-table.component.html',
  styleUrls: ['./disqualifiable-courses-table.component.scss']
})
export class DisqualifiableCoursesTableComponent implements OnInit {
  @Input() selectiveCourses: SelectiveCourse[];
  @Input() minGeneralStudentsCount: number;
  @Input() minProfessionalStudentsCount: number;
  isAllSelected: boolean;
  typeCycle = TypeCycle;

  ngOnInit() {
    this.isAllSelected = false;
  }

  changeAllIsSelected(): void {
    this.selectiveCourses.forEach(item => item.selected = this.isAllSelected);
  }
}
