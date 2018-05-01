import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {Teacher} from "../../../models/Teacher";
import {StudentGroup} from "../../../models/StudentGroup";
import {CourseForGroupService} from "../../../services/course-for-group.service";

@Component({
  selector: 'copy-courses-dialog',
  templateUrl: './copy-courses-dialog.component.html',
  styleUrls: ['./copy-courses-dialog.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ],
})
export class CopyCoursesDialogComponent implements OnInit {

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() groups: StudentGroup[];
  @Input() semester: number;
  @Input() coursesForGroups: CourseForGroup[] = [];
  @Input() addedCoursesForGroups: CourseForGroup[] = [];
  copiedCoursesForGroup: CourseForGroup[];
  selectedGroup: StudentGroup;
  searchText = '';

  constructor(private courseForGroupService: CourseForGroupService) { }

  ngOnInit() {
  }

  selectGroup(group: StudentGroup){
    this.selectedGroup = group;
    this.getCoursesForGroup();
    this.addSelectedCourses();
    this.close();
  }

  addSelectedCourses(){
    if (this.copiedCoursesForGroup !== undefined) {
      for (let course of this.copiedCoursesForGroup) {
        if (this.addedCoursesForGroups !== undefined) {
          let courseIsAdded = false;
          for (let courseForAdd of this.addedCoursesForGroups) {
            if (course.course.id === courseForAdd.course.id) {
              courseIsAdded = true;
            }
          }
          if (!courseIsAdded) {
            this.addedCoursesForGroups.push(course);
            this.coursesForGroups.push(course);
          }
        }
        else {
          this.addedCoursesForGroups.push(course);
          this.coursesForGroups.push(course);
        }
      }
    }
  }

  getCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.selectedGroup.id, this.semester).subscribe(courses => {
      this.copiedCoursesForGroup = courses;
    });
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
