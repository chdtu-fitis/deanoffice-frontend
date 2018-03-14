import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: 'validation-errors.component.html'
})
export class ValidationErrorsComponent {
  errorMessages = {
    'required': 'Поле обов\'язкове',
  };

  @Input() private control: AbstractControlDirective | AbstractControl;
  @Input() private messages: Object;

  shouldShowErrors(): boolean {
    return this.control
      && this.control.errors
      && (this.control.dirty || this.control.touched);
  }

  getFirstError(): string {
    return this.listOfErrors()[0];
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field));
  }

  private getMessage(type: string) {
    return Object.assign(this.errorMessages, this.messages)[type]
  }

}
