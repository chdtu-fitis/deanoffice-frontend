import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-base-reactive-form',
  template: '',
})
export class BaseReactiveFormComponent {
  form: FormGroup;

  submit() {
    this.validateAllFormFields(this.form);
  }

  protected validateAllFormFields(formGroup: FormGroup|FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.validateAllFormFields(control);
      }
    });
  }
}
