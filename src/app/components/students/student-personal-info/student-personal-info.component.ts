import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentService} from '../../../services/student.service';
import {Student} from '../../../models/Student';

@Component({
    selector: 'app-student-personal-info',
    templateUrl: './student-personal-info.component.html',
    styleUrls: ['./student-personal-info.component.scss'],
})
export class StudentPersonalInfoComponent extends BaseReactiveFormComponent implements IAppModal {
  form: FormGroup;
  model: Student;
  id: string;
  photo;
  newPhoto;
  @ViewChild('modal') modal: ModalDirective;
  @Output() onSubmit = new EventEmitter();

  constructor(private fb: FormBuilder, private studentService: StudentService, private sanitizer: DomSanitizer) {
    super();
  }

  openModal(id) {
    this.studentService.getStudentById(id).subscribe((student: Student) => {
      this.model = student;
      this.buildForm();
      this.modal.show();
    });
    this.studentService.getPhoto(id).subscribe(photo => {
      this.photo = photo;
    })
  }

  buildForm() {
    this.form = this.fb.group({
      photo: '',
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
  }

  onLoadPhoto(photo: File) {
    this.newPhoto = photo;
  }

  hideModal() {
    this.photo = null;
    this.modal.hide();
  }

  submit() {
    super.submit();
    if (this.form.invalid) {
      return;
    }
    const { id } = this.model;
    if (this.newPhoto) {
      this.studentService.updatePhoto(id, this.newPhoto).subscribe();
    }
    this.studentService.updateStudent(Object.assign(this.form.value, { id }))
      .subscribe(() => {
        this.onSubmit.emit();
        this.modal.hide();
      })
  }
}
