import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: 'validation-errors.component.html'
})
export class ValidationErrorsComponent {
  private static readonly errorMessages = {
    'required': () => 'Поле обов\'язкове',
    'studentSelected': () => 'Необхідно вибрати студента зі списку'
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

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
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ValidationErrorsComponent.errorMessages[type](params);
  }

}
