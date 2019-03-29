import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
  selector: '[appExpectedName]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: ExpectedNameDirective, multi: true
  }]
})
export class ExpectedNameDirective implements Validator {

  @Input() appExpectedName: string;

  validate(c: AbstractControl): ValidationErrors | null {
    return this.appExpectedName ? expectedNameValidator(new RegExp(this.appExpectedName))(c) : null;
  }

}

export function expectedNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isExpectedName = nameRe.test(control.value);
    return isExpectedName ? null : {'appExpectedName': true};
  }
}
