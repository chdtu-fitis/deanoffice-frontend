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
        id: [''],
        name: [''],
        surname: [''],
        patronimic: [''],
        birthDate: ['', Validators.required],
      }),
      studentGroupId: ['', Validators.required],
    })
  }

  addStudent() {
    console.log(this.form.value);
    console.log(this.form);
    // this.studentService.addStudent(this.form.value);
  }

  hideModal() {
    super.hideModal();
    this.form.reset();
  }
}
