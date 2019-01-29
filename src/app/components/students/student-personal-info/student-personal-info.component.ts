import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {Student} from '../../../models/Student';
import {StudentService} from '../../../services/student.service';

@Component({
    selector: 'app-student-personal-info',
    templateUrl: './student-personal-info.component.html',
    styleUrls: ['./student-personal-info.component.scss'],
})
export class StudentPersonalInfoComponent extends BaseReactiveFormComponent {
  form: FormGroup;
  model: Student;
  id: string;
  @Input() editable = true;
  @Output() onSubmit = new EventEmitter();
  @Output() hideModal: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    super();
  }

  buildForm() {
    this.form = this.fb.group({
      photoUrl: this.model.photoUrl,
      name: [this.model.name, Validators.required],
      surname: [this.model.surname, Validators.required],
      patronimic: [this.model.patronimic, Validators.required],
      nameEng: this.model.nameEng,
      surnameEng: this.model.surnameEng,
      patronimicEng: this.model.patronimicEng,
      telephone: this.model.telephone,
      sex: [this.model.sex, Validators.required],
      birthDate: [this.model.birthDate, Validators.required],
      registrationAddress: this.model.registrationAdress,
      actualAddress: this.model.actualAdress,
      studentCardNumber: this.model.studentCardNumber,
      school: this.model.school,
      fatherName: this.model.fatherName,
      fatherPhone: this.model.fatherPhone,
      fatherInfo: this.model.fatherInfo,
      motherName: this.model.motherName,
      motherPhone: this.model.motherPhone,
      motherInfo: this.model.motherInfo,
      notes: this.model.notes,
      email: this.model.email,
    });
    if (!this.editable) {
      this.form.disable();
    }
  }

  submit() {
    super.submit();
    if (this.form.invalid) {
      return;
    }
    const { id } = this.model;
    this.studentService.updateStudent(Object.assign(this.form.value, { id }))
      .subscribe(() => {
        this.onSubmit.emit();
        this.emitHide();
      })
  }

  emitHide() {
    this.hideModal.emit(null);
  }
}
