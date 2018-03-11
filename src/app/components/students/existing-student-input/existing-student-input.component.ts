import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {StudentService} from '../../../services/student.service';
import {StudentDegree} from '../../../models/StudentDegree';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';

@Component({
    selector: 'app-existing-student-input',
    templateUrl: './existing-student-input.component.html',
    styleUrls: ['./existing-student-input.component.scss'],
})
export class ExistingStudentInputComponent {
  asyncSelected: string;
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  model: string;
  form;
  dataSource: Observable<StudentDegree[]>;
  @Input() formControlName;
  @Input() formGroup;
  @Output() student = new EventEmitter();

  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.form = fb.group({
      query: '',
    });

    this.dataSource = Observable.create((observer: any) => {
      this.studentService.search(this.form.value.query).subscribe((result: any ) => {
        console.log(result);
        observer.next(result);
      });
    });
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  typeaheadOnSelect({item}: TypeaheadMatch): void {
    console.log('Selected value: ', item);
    const { surname, name, patronimic } = item;
    this.form.setValue({ query: `${surname} ${name} ${patronimic}`});
  }
}
