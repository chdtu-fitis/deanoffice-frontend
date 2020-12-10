import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {TypeCycle} from '../../../models/TypeCycle';

@Component({
  selector: 'assigned-courses',
  templateUrl: './assigned-courses.component.html',
  styleUrls: ['./assigned-courses.component.scss']
})
export class AssignedCoursesComponent implements OnInit {
  @Input() studyYear: string;
  @Input() degreeId: number;
  @Input() semester: number;
  @Output() onSelectedAssignedCoursesChange = new EventEmitter();
  @Input() showEditButton = true;

  typeCycle = TypeCycle;

  selectiveCourses = [];
  selectedAssignedCourses = [];
  isAllSelected = false;

  constructor(private selectiveCourseService: SelectiveCourseService) {
  }

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.studyYear && this.degreeId && this.semester) {
      this.selectiveCourseService.getSelectiveCourses(this.studyYear, this.degreeId, this.semester)
        .subscribe((selectiveCourses: SelectiveCourse[]) => {
          this.selectiveCourses = selectiveCourses;

          let isAllSelected = selectiveCourses.length > 0;
          const newSelection = [];

          this.selectiveCourses.forEach(item => {
            const i = this.selectedAssignedCourses.findIndex(selectedItem => item.id === selectedItem.id);
            if (i !== -1) {
              item.isSelected = true;
              newSelection.push(item);
            } else {
              isAllSelected = false;
            }
          });

          this.isAllSelected = isAllSelected;
          this.selectedAssignedCourses = newSelection;
          this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
        });
    }
  }

  changeAllIsSelected(): void {
    this.selectiveCourses.forEach(item => item.isSelected = this.isAllSelected);
    this.selectedAssignedCourses = this.isAllSelected ? this.selectiveCourses.slice() : [];
    this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
  }

  changeSelectedAssignedCourses(checked: boolean, selectedCourse: SelectiveCourse) {
    const i = this.selectedAssignedCourses.findIndex(item => item.id === selectedCourse.id);

    if (checked) {
      if (i === -1) {
        this.selectedAssignedCourses.push(selectedCourse);
      }
    } else {
      if (i !== -1) {
        this.selectedAssignedCourses.splice(i, 1);
      }
      this.isAllSelected = false;
    }

    this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
  }
}
