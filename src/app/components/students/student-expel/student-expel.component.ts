import {Component, EventEmitter, Input, ViewChild, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';

@Component({
    selector: 'app-student-expel',
    templateUrl: './student-expel.component.html',
    styleUrls: ['./student-expel.component.scss'],
})
export class StudentExpelComponent extends BaseReactiveFormComponent implements IAppModal {
  @ViewChild('modal') modal: ModalDirective;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      student: '',
      studentDegreeIds: this.fb.array([]),
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      applicationDate: ['', Validators.required],
      expelDate: ['', Validators.required],
      // reasonId: ['', Validators.required],
    })
  }

  onStudentSelect(student) {
    console.log(student);
  }

  submit() {
    console.log(this.form.value);
  }
}
