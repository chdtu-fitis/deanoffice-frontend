import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {Teacher} from '../../../models/Teacher';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {TeacherService} from '../../../services/teacher.service';

@Component({
  selector: 'recovery-teacher',
  templateUrl: './recovery-teacher.component.html',
  styleUrls: ['./recovery-teacher.component.scss']
})
export class RecoveryTeacherComponent {
  teacher: Teacher;
  teacherArr: Teacher[];
  @Output() recoveryTeacher: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;

  constructor(private teacherService: TeacherService) { }

  openModal(item: Teacher[]): void {
    this.teacherArr = item;
    this.modal.show();
  }

  submit(): void {
    this.teacherService
      .restoreTeacher(this.teacherArr.map(x => x.id))
      .subscribe((recoveredTeachers: Teacher[]) => {
        this.recoveryTeacher.emit(recoveredTeachers);
        this.modal.hide();
      })
  }

  hideModal(): void {
    this.modal.hide();
  }
}
