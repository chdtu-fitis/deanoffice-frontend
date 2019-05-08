import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('form') form: TeacherFormComponent;
  @Input() teacher: Teacher[];
  selectedTeacher: Teacher;

  constructor(private teacherService: TeacherService) { }

  openModal(selectedTeacher): void {
    this.selectedTeacher = selectedTeacher;
    this.form.setValues({
      'name': selectedTeacher.name,
      'surname': selectedTeacher.surname,
      'patronimic': selectedTeacher.patronimic,
      'position': selectedTeacher.position,
      'scientificDegree': selectedTeacher.scientificDegree,
      'department': selectedTeacher.department
    });
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(): void {
    const body = this.form.form.getRawValue();
    body.id = this.selectedTeacher.id;
    body.active = this.selectedTeacher.active;
    body.teacher = {id: body.teacher};
    this.teacherService.updateTeacher(body)
      .then(group => this.updateTeacher.emit(group))
      .then(() => this.hideModal())
      .catch(null);
  }

}

