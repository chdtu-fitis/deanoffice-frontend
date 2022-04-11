import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectiveCourse} from '../../../../models/SelectiveCourse';
import {TypeCycle} from '../../../../models/TypeCycle';

@Component({
  selector: 'disqualifiable-courses-table',
  templateUrl: './disqualifiable-courses-table.component.html',
  styleUrls: ['./disqualifiable-courses-table.component.scss']
})
export class DisqualifiableCoursesTableComponent implements OnInit {

  @Output() onSelectedSelectiveCoursesChange = new EventEmitter();
  @Input() selectiveCourses: SelectiveCourse[];
  @Input() minGeneralStudentsCount: number;
  @Input() minProfessionalStudentsCount: number;
  selectedSelectiveCourses: SelectiveCourse[];
  isAllSelected: boolean;

  typeCycle = TypeCycle;

  ngOnInit() {
    this.initializeSelectiveCourses();
  }

  private initializeSelectiveCourses(): void {
    let isAllSelected = this.selectiveCourses.length > 0;
    const selectedSelectiveCourses = [];

    this.selectiveCourses.forEach(item => {
      const i = this.selectedSelectiveCourses.findIndex(selectedItem => item.id === selectedItem.id);
      if (i !== -1) {
        item.selected = true;
        selectedSelectiveCourses.push(item);
      } else {
        isAllSelected = false;
      }
    });

    this.isAllSelected = isAllSelected;
    this.selectedSelectiveCourses = selectedSelectiveCourses;
    this.onSelectedSelectiveCoursesChange.emit(this.selectedSelectiveCourses);
  }

  changeAllIsSelected(): void {
    this.selectiveCourses.forEach(item => item.selected = this.isAllSelected);
    this.selectedSelectiveCourses = this.isAllSelected ? this.selectiveCourses.slice() : [];
    this.onSelectedSelectiveCoursesChange.emit(this.selectedSelectiveCourses);
  }

  changeSelectedSelectiveCourses(checked: boolean, selectedCourse: SelectiveCourse) {
    const i = this.selectedSelectiveCourses.findIndex(item => item.id === selectedCourse.id);

    if (checked) {
      if (i === -1) {
        this.selectedSelectiveCourses.push(selectedCourse);
      }
    } else {
      if (i !== -1) {
        this.selectedSelectiveCourses.splice(i, 1);
      }
      this.isAllSelected = false;
    }

    this.onSelectedSelectiveCoursesChange.emit(this.selectedSelectiveCourses);
  }
}
