import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

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
  courseForGroups: CourseForGroup;
  @Output() onTeacherSelect = new EventEmitter();
  teachers: Teacher[] = [];
  searchText = '';

  constructor(private teacherService: TeacherService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers
    })
  }

  selectTeacher(teacher: Teacher) {
    this.courseForGroups.teacher = teacher;
    this.onTeacherSelect.emit(this.courseForGroups);
    this.bsModalRef.hide()
  }
}
