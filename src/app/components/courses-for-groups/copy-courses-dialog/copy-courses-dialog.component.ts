import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {Teacher} from "../../../models/Teacher";
import {StudentGroup} from "../../../models/StudentGroup";
import {CourseForGroupService} from "../../../services/course-for-group.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'copy-courses-dialog',
  templateUrl: './copy-courses-dialog.component.html',
  styleUrls: ['./copy-courses-dialog.component.scss']
})
export class CopyCoursesDialogComponent implements OnInit {

  @Input() groups: StudentGroup[];
  @Input() semester: number;
  @Input() coursesForGroups: CourseForGroup[] = [];
  @Input() addedCoursesForGroups: CourseForGroup[] = [];
  @Output() copiedCourse: EventEmitter<CourseForGroup> = new EventEmitter<CourseForGroup>();
  @Output() alertMessage: EventEmitter<String> = new EventEmitter<String>();
  copiedCoursesForGroup: CourseForGroup[];
  selectedGroup: StudentGroup;
  searchText = '';

  constructor(private courseForGroupService: CourseForGroupService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  selectGroup(group: StudentGroup){
    this.selectedGroup = group;
    this.addCoursesForGroup();
    this.activeModal.close('Close click')
  }

  addSelectedCourses(){
    if (this.copiedCoursesForGroup){
      for (let copiedCourse of this.copiedCoursesForGroup){
        let courseIsAdded = false;
        if (this.coursesForGroups){
          for (let course of this.coursesForGroups){
            if (course.course.id === copiedCourse.course.id) courseIsAdded = true;
          }
        }
        if (!courseIsAdded){
          copiedCourse.examDate = null;
          if (!copiedCourse.teacher){
            let teacher = new Teacher();
            copiedCourse.teacher = teacher;
          }
          this.copiedCourse.emit(copiedCourse);
        }
        else this.alertMessage.emit('Предмет "' + copiedCourse.course.courseName.name + '" не було додано, тому що він існує');
      }
    }
  }

  addCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.selectedGroup.id, this.semester).subscribe(courses => {
      this.copiedCoursesForGroup = courses;
      this.addSelectedCourses();
    });
  }
}
