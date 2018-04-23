import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Teacher} from '../../../models/Teacher';
import {TeacherService} from '../../../services/teacher.service';
import {CourseForGroup} from '../../../models/CourseForGroup';

@Component({
  selector: 'teacher-dialog',
  templateUrl: './teacher-dialog.component.html',
  styleUrls: ['./teacher-dialog.component.scss'],
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
  providers: [TeacherService]
})
export class TeacherDialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() coursesForGroups: CourseForGroup[] = [];
  @Input() cfgIndex: number;
  @Output() onTeacherSelect = new EventEmitter();
  teachers: Teacher[] = [];
  searchText = '';
  constructor(private teacherService: TeacherService) { }

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(teachers => {
      this.teachers = teachers
    })
  }

  selectTeacher(teacher: Teacher){
    this.coursesForGroups[this.cfgIndex].teacher = teacher;
    this.onTeacherSelect.emit(this.coursesForGroups);
    this.close();
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
