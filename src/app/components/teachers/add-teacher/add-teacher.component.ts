import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TeacherService} from '../../../services/teacher.service';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {TeacherFormComponent} from '../teacher-form/teacher-form.component';
import {Teacher} from '../../../models/Teacher';
import {SpecializationFormComponent} from '../../specialization/specialization-form/specialization-form.component';
import {SpecializationService} from '../../../services/specialization.service';

@Component({
  selector: 'add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent{

  @Output() addSpecialization: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('form') form: TeacherFormComponent;
  @Input() teachers: Teacher[];

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
      .create(this.form.getValue())
      .then((teacher) => {
        this.addSpecialization.emit(teacher)
      })
      .then(() => this.hideModal())
      .catch(null);
  }
}
