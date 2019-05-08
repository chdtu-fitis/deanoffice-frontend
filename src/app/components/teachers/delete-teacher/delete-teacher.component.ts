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
  teacherArr: Teacher[];
  @Output() deleteTeacher: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;

  constructor(private teacherService: TeacherService) { }

  openModal(item: Teacher[]): void {
    this.teacherArr = item;
    this.modal.show();
  }

  submit(): void {
    this.teacherService
      .deleteTeacher(this.teacherArr.map(x => x.id))
      .subscribe((deletedTeachers: Teacher[]) => {
        this.deleteTeacher.emit(deletedTeachers);
        this.modal.hide();
      })
  }

  hideModal(): void {
    this.modal.hide();
  }
}
