import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ModalComponent } from '../../shared/modal/modal.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {StudentService} from '../../../services/student.service';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent extends ModalComponent {
  form: FormGroup;
  @Input() groups: StudentGroup[];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    super();
    this.form = fb.group({
      student: fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        patronimic: ['', Validators.required],
        birthDate: ['', Validators.required],
      }),
      studentGroupId: ['', Validators.required],
      test: '',
    })
  }

  selectExisting(value) {
    console.log('selected', value);
  }

  addStudent() {
    console.log(this.form.value);
    console.log(this.form);
    this.studentService.addStudent(this.form.value);
  }

  hideModal() {
    super.hideModal();
    this.form.reset();
  }
}
