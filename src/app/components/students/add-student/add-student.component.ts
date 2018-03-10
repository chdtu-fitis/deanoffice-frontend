import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ModalComponent } from '../../shared/modal/modal.component';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent extends ModalComponent {
  form: FormGroup;
  @Input() groups: StudentGroup[];

  constructor(private fb: FormBuilder) {
    super();
    this.form = fb.group({
      student: fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        patronimic: ['', Validators.required],
        birthDate: ['', Validators.required],
      }),
      studentGroupId: ['', Validators.required],
    })
  }
}
