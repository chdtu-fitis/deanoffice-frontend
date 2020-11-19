import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {AssignedCoursesComponent} from '../assigned-courses/assigned-courses.component';

@Component({
  selector: 'copy-dialog',
  templateUrl: './copy-dialog.component.html',
  styleUrls: ['./copy-dialog.component.scss']
})
export class CopyDialogComponent implements OnInit {
  studyYear: number;
  degreeId: number;
  semester: number;

  years = [
    {id: '2020', name: '2020-2021'},
    {id: '2021', name: '2021-2022'},
    {id: '2022', name: '2022-2023'}];
  selectedYear: string;
  filteredYears = [];

  selectedSelectiveCourses = []

  @Output() onCopy = new EventEmitter();

  @ViewChild(AssignedCoursesComponent, {static: true}) assignedCoursesChild: AssignedCoursesComponent;

  constructor(public bsModalRef: BsModalRef, private selectiveCourseService: SelectiveCourseService) {
  }

  ngOnInit() {
    this.filteredYears = this.years.filter(year => +year.id < this.studyYear);
    if (this.filteredYears.length > 0) {
      this.selectedYear = this.filteredYears[0].id;
    }
  }

  copy() {
    for (const selectiveCourse of this.selectedSelectiveCourses) {
      const body = {
        available: true,
        course: {id: selectiveCourse.course.id},
        degree: {id: this.degreeId},
        department: {id: selectiveCourse.department.id},
        description: selectiveCourse.description,
        fieldsOfKnowledge: selectiveCourse.fieldsOfKnowledge ? selectiveCourse.fieldsOfKnowledge : [],
        studyYear: this.studyYear,
        teacher: selectiveCourse.teacher ? {id: selectiveCourse.teacher.id} : null,
        trainingCycle: selectiveCourse.trainingCycle,
      };

      this.selectiveCourseService.createSelectiveCourse(body).subscribe(() => {
        this.onCopy.emit();
      }, error => {
        console.log('Error body: ', body);
      });
    }

    this.bsModalRef.hide();
  }

  onSelectedYearChange() {
    this.assignedCoursesChild.studyYear = this.selectedYear;
    this.assignedCoursesChild.load();
  }

  changeSelectedSelectiveCourses(selectedSelectiveCourses) {
    this.selectedSelectiveCourses = selectedSelectiveCourses;
  }
}
