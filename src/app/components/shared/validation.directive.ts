import { FormControl } from '@angular/forms';
import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[appValidation]' })
export class ValidationDirective {
  @Input('appValidation') control: FormControl;

  @HostBinding('class.is-valid')
  get valid() {
    return this.control.touched && this.control.valid;
  }

  @HostBinding('class.is-invalid')
  get invalid() {
    return this.control.touched && this.control.invalid;
  }
}
