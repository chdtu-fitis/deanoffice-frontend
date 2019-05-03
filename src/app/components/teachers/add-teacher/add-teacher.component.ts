import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TeacherService} from '../../../services/teacher.service';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {TeacherFormComponent} from '../teacher-form/teacher-form.component';

@Component({
  selector: 'add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent{

  @Output() addTeacher: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('form') form: TeacherFormComponent;

  constructor(private teacherService: TeacherService) { }

  openModal(): void {
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
      .createTeacher(this.form.getValue())
      .then((teacher) => {
        this.addTeacher.emit(teacher)
      })
      .then(() => this.hideModal())
      .catch(null);
  }
}
