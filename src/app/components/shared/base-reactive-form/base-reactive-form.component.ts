import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-base-reactive-form',
  template: '',
})
export class BaseReactiveFormComponent {
  form: FormGroup;

  onSubmit() {
    this.validateAllFormFields(this.form);
    if (this.form.invalid) {
      return;
    }
  }

  protected validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
