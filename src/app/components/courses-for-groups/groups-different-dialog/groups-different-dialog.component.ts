import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {CourseForGroupService} from '../../../services/course-for-group.service';
import {ForeignCourses} from '../../../models/ForeignCourses';
import {Course} from '../../../models/Course';

@Component({
  selector: 'groups-different-dialog',
  templateUrl: './groups-different-dialog.component.html',
  styleUrls: ['./groups-different-dialog.component.scss'],
  providers: [CourseForGroupService],
})
export class GroupsDifferentDialogComponent implements OnInit {

  foreignGroupsAndCourses: ForeignCourses[] = [];
  @Output() showDifferents: EventEmitter< ForeignCourses> = new EventEmitter< ForeignCourses>();

  constructor(public bsModalRef: BsModalRef,
              private foreignGroupsAndCoursesService: CourseForGroupService) { }

  ngOnInit() {
    this.foreignGroupsAndCoursesService.getForeignCourseAndGroups().subscribe((foreignGroupsAndCourses: ForeignCourses[]) => {
      this.foreignGroupsAndCourses = foreignGroupsAndCourses;
      for (const foreignGroupWithCourses of this.foreignGroupsAndCourses) {
        const differentForeignCourses = foreignGroupWithCourses.differentForeignCourses;
        const differentOtherCourses = foreignGroupWithCourses.differentOtherCourses;
        for (let i = 0; i < differentForeignCourses.length; i++) {
          let found = false;
          for (let j = 0; i < differentOtherCourses.length; j++) {
            if (differentForeignCourses[i].courseName === differentOtherCourses[j].courseName && differentForeignCourses[i].semester === differentOtherCourses[j].semester) {
              const temp =  differentOtherCourses[j];
              differentOtherCourses[j] = differentOtherCourses[i];
              differentOtherCourses[i] = temp;
              found = true;
              break;
            }
            if (!found) {
              const temp =  differentOtherCourses[i];
              differentOtherCourses[i] = new Course();
              differentOtherCourses.push(temp);
            }
          }
        }
        for (let i = differentForeignCourses.length; i < differentOtherCourses.length; i++) {
          differentForeignCourses.push(new Course());
        }
      }
    })
  }
}

