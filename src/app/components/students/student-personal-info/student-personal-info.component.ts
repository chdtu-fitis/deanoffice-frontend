import {Component, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {IAppModal} from '../../shared/modal.interface';

@Component({
    selector: 'app-student-personal-info',
    templateUrl: './student-personal-info.component.html',
    styleUrls: ['./student-personal-info.component.scss'],
})
export class StudentPersonalInfoComponent implements IAppModal {
  form: FormGroup;
  @ViewChild('modal') modal: ModalDirective;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      patronimic: ['', Validators.required],
      nameEng: '',
      surnameEng: '',
      patronimicEng: '',
      telephone: '',
      sex: ['', Validators.required],
      birthDate: ['', Validators.required],
      registrationAddress: '',
      actualAddress: '',
      studentCardNumber: '',
      school: '',
      fatherName: '',
      fatherPhone: '',
      fatherInfo: '',
      motherName: '',
      motherPhone: '',
      motherInfo: '',
      motherNotes: '',
      motherEmail: '',
      notes: '',
      email: '',
    })
  }

  submit() {
    console.log(this.form.value);
  }
}
