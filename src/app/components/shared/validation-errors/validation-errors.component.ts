import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: 'validation-errors.component.html'
})
export class ValidationErrorsComponent {
  errorMessages = {
    'required': 'Поле обов\'язкове',
    'maxlength': 'Максимальна довжина ${requiredLength} символів'
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
      .map(this.replaceTemplate.bind(this))
  }

  private getMessage(type: string) {
    return Object.assign(this.errorMessages, this.messages)[type]
  }

  private replaceTemplate(field: string): string {
    const message: string = this.getMessage(field);
    const requiredLength: string = this.control.errors[field]['requiredLength'];
    return message.replace('${requiredLength}', requiredLength);
  }
}
