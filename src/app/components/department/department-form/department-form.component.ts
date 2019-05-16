import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss']
})
export class DepartmentFormComponent {

  form = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[ A-zА-яІіЇї0-9-]*')
    ]),
    abbr: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern('[A-zА-яІіЇї0-9-]*')
    ])
  });

  constructor() {

  }

  setValues (values) {
    this.form.controls.name.setValue(values['name']);
    this.form.controls.abbr.setValue(values['abbr']);
  }

}
