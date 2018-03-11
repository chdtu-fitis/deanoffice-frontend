import {
  Component, EventEmitter, Input, forwardRef, Output
} from '@angular/core';
import {
  ControlValueAccessor, FormBuilder, FormControl, NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors, Validator
} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {StudentService} from '../../../services/student.service';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-existing-student-input',
  templateUrl: 'existing-student-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExistingStudentInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExistingStudentInputComponent),
      multi: true,
    }
  ]
})

export class ExistingStudentInputComponent implements ControlValueAccessor, Validator {
  @Input() control: FormControl;
  @Input() id: string;
  @Input() ngClass: any;
  @Output() onValueChange = new EventEmitter();
  val: any;
  selectedItem: any;
  dataSource: Observable<any>;

  propagateChange = (_) => {};

  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.dataSource = Observable.create((observer: any) => {
      // this.selectedItem = null;
      this.studentService.search(this.val).subscribe((result: any ) => {
        console.log(result);
        observer.next(result);
      });
    });
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  writeValue(value) {
    if (value) {
      this.val = value;
    }
  }

  validate(c: FormControl): ValidationErrors {
    // todo add validation on val change
    return null;
    // return (!this.selectedItem) ? {
    //   studentSelected: {
    //     valid: false,
    //   },
    // } : null;
  }

  onSelect({item}: TypeaheadMatch) {
    const { surname, name, patronimic } = item;
    this.val = `${surname} ${name} ${patronimic}`;
    this.selectedItem = item;
    this.propagateChange(item.id);
    this.onValueChange.emit(item);
  }
}
