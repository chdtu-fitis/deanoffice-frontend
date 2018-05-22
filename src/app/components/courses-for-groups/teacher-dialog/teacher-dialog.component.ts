import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Teacher} from '../../../models/Teacher';
import {TeacherService} from '../../../services/teacher.service';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss'],
  providers: [TeacherService]
})
export class TeacherDialogComponent implements OnInit {
  @Input() coursesForGroups: CourseForGroup[] = [];
  @Input() cfgIndex: number;
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
    this.coursesForGroups[this.cfgIndex].teacher = teacher;
    this.onTeacherSelect.emit(this.coursesForGroups);
    this.activeModal.close('Close click')
  }
}
