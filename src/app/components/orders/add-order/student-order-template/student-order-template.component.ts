import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { CustomControlValueAccessor } from '../../../shared/custom-control-value-accessor';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Student} from '../../../../models/Student';

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

  @Input() orderStudentGroup: FormGroup;
  @Input() orderReasons: any[];
  @Input() isTemplateEditable = true;

  @Output() onStudentAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() onStudentDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onStudentEdit: EventEmitter<void> = new EventEmitter<void>();

  get isVoluntarily(): boolean {
    return this.orderStudentGroup.get('orderReason').value === 'voluntarily';
  }

  constructor() {
    super();
  }

  ngOnInit() {}

  public onOrderReasonChange(value: string): void {
    const orderApplication = this.orderStudentGroup.get('orderApplicationDate');
    value === 'voluntarily' ? orderApplication.enable() : orderApplication.disable();
  }

  public onAddStudent(): void {
    this.isTemplateEditable = !this.isTemplateEditable;
    this.onStudentAdd.emit();
  }

  public onStudentSelect(student: Student) {
    this.orderStudentGroup.get('studentFullName').setValue(`${student.name} ${student.surname} ${student.patronimic}`);
  }

  public onTemplateEdit() {
    this.isTemplateEditable = !this.isTemplateEditable;
    this.onStudentEdit.emit();
  }

  public onTemplateDelete() {
    this.onStudentDelete.emit();
  }
}
