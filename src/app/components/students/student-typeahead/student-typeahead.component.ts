import {
  Component, EventEmitter, Input, forwardRef, Output
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { StudentService } from '../../../services/student.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-student-typeahead',
  templateUrl: 'student-typeahead.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef((): typeof StudentTypeaheadComponent => StudentTypeaheadComponent),
      multi: true
    }
  ]
})
export class StudentTypeaheadComponent implements ControlValueAccessor {
  @Input() control: FormControl;
  @Input() id: string;
  @Output() onValueChange = new EventEmitter();
  val: string;
  selectedId: any;
  dataSource: Observable<any>;
  errorMessages = { required: 'Необхідно вибрати студента зі списку' };

  constructor(private studentService: StudentService) {
    this.dataSource = Observable.create((observer: any): void => {
      if (this.val.length < 3) {
        return;
      }

      // clear the selected value if input value was changed after selection
      if (this.selectedId) {
        this.selectedId = null;
        this.propagateChange();
      }
      this.studentService.search(this.val).subscribe((result: any): void => {
        observer.next(result);
      });
    });
  }

  propagateChange = (value?): void => {};

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  writeValue(value): void {
    if (value) {
      this.val = value;
    }
  }

  onSelect({ item }: TypeaheadMatch): void {
    const { surname, name, patronimic } = item;
    this.val = `${surname} ${name} ${patronimic}`;
    this.propagateChange(item.id);
    this.selectedId = item.id;
    this.onValueChange.emit(item);
  }
}
