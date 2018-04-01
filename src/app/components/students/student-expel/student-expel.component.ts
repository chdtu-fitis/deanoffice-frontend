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

  constructor(
    private fb: FormBuilder,
  ) {
    super();
  }

  submit() {
  }
}
