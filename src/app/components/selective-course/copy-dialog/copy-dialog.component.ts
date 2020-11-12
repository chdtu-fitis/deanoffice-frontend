import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';

@Component({
  selector: 'copy-dialog',
  templateUrl: './copy-dialog.component.html',
  styleUrls: ['./copy-dialog.component.scss']
})
export class CopyDialogComponent implements OnInit {
  studyYear: number;
  degreeId: number;
  semester: number;

  years = [{id: '2020', name: '2020-2021'}, {id: '2021', name: '2021-2022'}, {id: '2022', name: '2022-2023'}];
  selectedYear: string;
  filteredYears = [];

  @Output() onCopy = new EventEmitter();

  constructor(public bsModalRef: BsModalRef, private selectiveCourseService: SelectiveCourseService) {
  }

  ngOnInit() {
    this.filteredYears = this.years.filter(year => +year.id !== this.studyYear);
    this.selectedYear = this.filteredYears[0].id;
  }

  copy() {
    this.selectiveCourseService.getSelectiveCourses(this.selectedYear, this.degreeId, this.semester).subscribe(selectiveCourses => {
      for (const selectiveCourse of selectiveCourses) {
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
    });
    this.bsModalRef.hide();
  }
}
