import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {BsModalRef} from 'ngx-bootstrap';

import {CourseForGroup} from '../../../models/CourseForGroup';
import {Teacher} from '../../../models/Teacher';
import {StudentGroup} from '../../../models/StudentGroup';
import {CourseForGroupService} from '../../../services/course-for-group.service';

const studySemesters = 12;

@Component({
  selector: 'copy-courses-dialog',
  templateUrl: './copy-courses-dialog.component.html',
  styleUrls: ['./copy-courses-dialog.component.scss']
})
export class CopyCoursesDialogComponent implements OnInit {

  groups: StudentGroup[];
  selectedSemesterTo: number;
  selectedSemesterFrom: number;
  coursesForGroups: CourseForGroup[] = [];
  @Output() copiedCourse: EventEmitter<CourseForGroup> = new EventEmitter<CourseForGroup>();
  @Output() alertMessage: EventEmitter<String> = new EventEmitter<String>();
  semesters = Array.from(new Array(studySemesters), (val, index) => index + 1);
  copiedCoursesForGroup: CourseForGroup[] = [];
  coursesForGroupForCopyIds: Array<number>;
  selectedGroup: StudentGroup;
  searchText = '';
  allRowsIsSelected = true;
  modalRef: BsModalRef;

  constructor(private courseForGroupService: CourseForGroupService) { }

  ngOnInit() {
  }

  selectGroup(group: StudentGroup) {
    this.selectedGroup = group;
    if (this.selectedSemesterFrom === this.selectedSemesterTo) {
      this.addCoursesForGroup();
      this.modalRef.hide();
    } else {
      this.getCoursesForGroup();
    }
  }


  addSelectedCourses() {
    if (!this.copiedCoursesForGroup.length) {
      return;
    }
    for (const copiedCourse of this.copiedCoursesForGroup) {
      let courseIsAdded = false;
      if (this.coursesForGroups) {
        for (const course of this.coursesForGroups) {
          if (course.course.id === copiedCourse.course.id) {
            courseIsAdded = true;
          }
        }
      }
      if (!courseIsAdded) {
        copiedCourse.examDate = null;
        if (!copiedCourse.teacher) {
          const teacher = new Teacher();
          copiedCourse.teacher = teacher;
        }
        this.copiedCourse.emit(copiedCourse);
      } else {
        this.alertMessage.emit('Предмет "' + copiedCourse.course.courseName.name + '" не було додано, тому що він існує');
      }
    }
  }

  getCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.selectedGroup.id, this.selectedSemesterFrom).subscribe(courses => {
      this.copiedCoursesForGroup = courses;
      this.coursesForGroupForCopyIds = this.copiedCoursesForGroup.map(c => c.id);
    });
  }

  changeCopiedCoursesForGroup(checked: boolean, selectedCourse: CourseForGroup) {
    if (!checked) {
      const index = this.coursesForGroupForCopyIds.indexOf(selectedCourse.id);
      this.coursesForGroupForCopyIds.splice(index, 1);
    } else {
      this.coursesForGroupForCopyIds.push(selectedCourse.id);
    }
  }

  copyCourses() {
    this.courseForGroupService.createCoursesForGroupNewSem(
      this.selectedSemesterTo,
      this.coursesForGroupForCopyIds
    ).subscribe(courses => {
      this.copiedCoursesForGroup = courses;
      this.addSelectedCourses();
    });
    this.modalRef.hide();
  }

  addCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.selectedGroup.id, this.selectedSemesterTo).subscribe(courses => {
      this.copiedCoursesForGroup = courses;
      this.addSelectedCourses();
    });
  }
}
