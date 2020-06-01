import {Component, forwardRef, OnInit} from '@angular/core';
import {CustomControlValueAccessor} from '../../../shared/custom-control-value-accessor';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'student-order-template',
  templateUrl: './student-order-template.component.html',
  styleUrls: ['./student-order-template.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StudentOrderTemplateComponent),
      multi: true
    }
  ]
})
export class StudentOrderTemplateComponent extends CustomControlValueAccessor implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
