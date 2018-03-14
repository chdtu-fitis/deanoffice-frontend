import {Component, EventEmitter, Input, forwardRef, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {StudentService} from '../../../services/student.service';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';

@Component({
  selector: 'app-student-typeahead',
  templateUrl: 'student-typeahead.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StudentTypeaheadComponent),
      multi: true
    },
  ]
})

export class StudentTypeaheadComponent implements ControlValueAccessor {
  @Input() control: FormControl;
  @Input() id: string;
  @Output() onValueChange = new EventEmitter();
  val: string;
  selectedItem: any;
  dataSource: Observable<any>;

  propagateChange = (_) => {};

  constructor(private studentService: StudentService) {
    this.dataSource = Observable.create((observer: any) => {
      if (this.val.length < 3) {
        return;
      }
      this.propagateChange('');
      this.studentService.search(this.val).subscribe((result: any ) => {
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

  onSelect({item}: TypeaheadMatch) {
    const { surname, name, patronimic } = item;
    this.val = `${surname} ${name} ${patronimic}`;
    this.propagateChange(item.id);
    this.onValueChange.emit(item);
  }
}
