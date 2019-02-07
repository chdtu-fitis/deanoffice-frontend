import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

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
  @Input() courseForGroups: CourseForGroup;
  @Output() onTeacherSelect = new EventEmitter();
  teachers: Teacher[] = [];
  searchText = '';
  constructor(private teacherService: TeacherService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers
    })
  }

  selectTeacher(teacher: Teacher){
    this.courseForGroups.teacher = teacher;
    this.onTeacherSelect.emit(this.courseForGroups);
    this.activeModal.close('Close click')
  }
}
