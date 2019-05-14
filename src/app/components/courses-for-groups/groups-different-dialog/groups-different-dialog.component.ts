import {Component,  OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {ForeignCourses} from '../../../models/ForeignCourses';


@Component({
  selector: 'groups-different-dialog',
  templateUrl: './groups-different-dialog.component.html',
  styleUrls: ['./groups-different-dialog.component.scss'],
  providers: []
})
export class GroupsDifferentDialogComponent implements OnInit {

  foreignGroupsAndCourses: ForeignCourses[] = [];

  constructor(public bsModalRef: BsModalRef,
              private foreignGroupsAndCoursesService: CourseForGroupService) { }

  ngOnInit() {
    this.foreignGroupsAndCoursesService.getForeignCourseAndGroups().subscribe((foreignGroupsAndCourses: ForeignCourses[]) => {
      this.foreignGroupsAndCourses = foreignGroupsAndCourses;
    })
  }

}
