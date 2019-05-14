import {Component,  OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {GroupsDifferentDialogService} from '../../../services/groups-different-dialog.service';
import {ForeignCourses} from '../../../models/ForeignCourses';


@Component({
  selector: 'groups-different-dialog',
  templateUrl: './groups-different-dialog.component.html',
  styleUrls: ['./groups-different-dialog.component.scss'],
  providers: [GroupsDifferentDialogService]
})
export class GroupsDifferentDialogComponent implements OnInit {

  foreignGroupsAndCourses: ForeignCourses[] = [];

  constructor(public bsModalRef: BsModalRef,
              private foreignGroupsAndCoursesService: GroupsDifferentDialogService) { }

  ngOnInit() {
    this.foreignGroupsAndCoursesService.getForeignCourseAndGroups().subscribe((foreignGroupsAndCourses: ForeignCourses[]) => {
      this.foreignGroupsAndCourses = foreignGroupsAndCourses;
    })
  }

}
