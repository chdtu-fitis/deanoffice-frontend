import {Component, EventEmitter, Output, Input, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {TeacherService} from '../../../services/teacher.service';
import {TeacherFormComponent} from '../teacher-form/teacher-form.component';
import {Teacher} from '../../../models/Teacher';

@Component({
  selector: 'update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent {
  @Output() updateTeacher: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;
  @ViewChild('form', { static: false }) form: TeacherFormComponent;

  constructor(private teacherService: TeacherService) { }

  getTitle(): string {
    return 'Оновлення інформації про викладача:';
  }

  openModal(teacher): void {
    teacher.positionId = teacher.position.id;
    teacher.departmentId = teacher.department.id;
    teacher.scientificDegreeId = teacher.scientificDegree && teacher.scientificDegree.id;
    this.form.setInitialData(teacher);
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid()) {
      return;
    }
    this.teacherService
      .updateTeacher(this.form.getValue())
      .then((teacher) => this.updateTeacher.emit(teacher))
      .then(() => this.hideModal())
      .catch(null);
  }
}
