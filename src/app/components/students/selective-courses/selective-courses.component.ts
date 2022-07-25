import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BsModalRef, ModalDirective} from 'ngx-bootstrap/modal';
import {StudentDegree} from '../../../models/StudentDegree';
import {SelectiveCourseService} from '../../../services/selective-course.service';

@Component({
  selector: 'show-selected-courses-of-students',
  templateUrl: './selective-courses.component.html',
  styleUrls: ['./selective-courses.component.scss']
})

export class SelectiveCoursesComponent implements OnInit {
  @Input() selected: StudentDegree[];
  constructor(public bsModalRef: BsModalRef, private selectiveCourseService: SelectiveCourseService,) { }

  ngOnInit() {
    // this.selectiveCourseService.
  }

}
