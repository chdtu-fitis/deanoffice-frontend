import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

import {Teacher} from '../../../models/Teacher';
import {TeacherService} from '../../../services/teacher.service';
import {CourseForGroup} from '../../../models/CourseForGroup';

@Component({
  selector: 'teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss'],
  providers: [TeacherService]
})
export class TeacherDialogComponent implements OnInit {
  courseForGroup: CourseForGroup;
  @Output() onTeacherSelect = new EventEmitter();
  teachers: Teacher[] = [];
  searchText = '';

  constructor(private teacherService: TeacherService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.teacherService.getTeachersShort().subscribe(teachers => {
      this.teachers = teachers
    })
  }

  selectTeacher(teacher: Teacher) {
    this.courseForGroup.teacher = teacher;
    this.onTeacherSelect.emit(this.courseForGroup);
    this.bsModalRef.hide()
  }
}
