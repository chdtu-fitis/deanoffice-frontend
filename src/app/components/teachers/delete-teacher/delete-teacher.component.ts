import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {Teacher} from '../../../models/Teacher';
import {TeacherService} from '../../../services/teacher.service';

@Component({
  selector: 'delete-teacher',
  templateUrl: './delete-teacher.component.html',
  styleUrls: ['./delete-teacher.component.scss']
})
export class DeleteTeacherComponent {
  teacher: Teacher;
  @Output() deleteTeacher: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;

  constructor(private teacherService: TeacherService) { }

  openModal(item: Teacher): void {
    this.teacher = item;
    this.modal.show();
  }

  submit(): void {
    this.teacherService
      .deleteTeacher(this.teacher.id)
      .then(() => {
        this.deleteTeacher.emit(null);
        this.modal.hide()
      });
  }

  hideModal(): void {
    this.modal.hide();
  }
}
