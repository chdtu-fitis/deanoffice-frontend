import { Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class CustomControlValueAccessor implements ControlValueAccessor {
  // tslint:disable-next-line:no-input-rename
  @Input('value') val: any = false;

  public disabled = false;

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
  }

  public onChange: any = (_: any) => {};
  public onTouched: any = () => {};

  public writeValue(value): void {
    this.value = value;
  }

  public registerOnChange(fn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onBlur() {
    this.onTouched();
  }
}
