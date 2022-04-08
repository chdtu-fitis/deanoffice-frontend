import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {SelectiveCourse} from '../../../models/SelectiveCourse';

@Component({
  selector: 'disqualify-courses-dialog',
  templateUrl: './disqualify-courses-dialog.component.html',
  styleUrls: ['./disqualify-courses-dialog.component.scss']
})
export class DisqualifyCoursesDialogComponent implements OnInit {

  studyYear: string;
  degreeId: number;
  semester: number;

  selectiveCourses: SelectiveCourse[] = [];
  selectedSelectiveCourses: SelectiveCourse[] = [];

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.selectiveCourseService.getSelectiveCoursesWithStudentsCount(this.studyYear, this.degreeId, this.semester)
      .subscribe((selectiveCourses: SelectiveCourse[]) => {
        const selectiveCoursesToApprove = [], selectiveCoursesToDecline = [];
        selectiveCourses.forEach(sc => {
          if (sc.studentsCount >= 20)
            selectiveCoursesToApprove.push(sc);
          else {
            sc.selected = true;
            selectiveCoursesToDecline.push(sc);
          }
        });
        this.selectiveCourses = selectiveCoursesToApprove.concat(selectiveCoursesToDecline);
        // this.selectiveCourses = selectiveCourses;
      }, error => {
        console.log(error);
      })
    console.log(this.selectiveCourses);
  }

  changeSelectedSelectiveCourses(selectedSelectiveCourses: SelectiveCourse[]) {
    this.selectedSelectiveCourses = selectedSelectiveCourses;
    console.log(selectedSelectiveCourses);
  }

  submit() {

  }

}
