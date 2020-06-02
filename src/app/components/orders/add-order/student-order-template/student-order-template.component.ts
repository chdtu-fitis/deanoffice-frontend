import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { CustomControlValueAccessor } from '../../../shared/custom-control-value-accessor';
import { FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Student} from '../../../../models/Student';
import {first} from 'rxjs/operators';
import {APPLICATION_REASON} from '../../constants';

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
export class StudentOrderTemplateComponent extends CustomControlValueAccessor implements OnInit, OnChanges {

  @Input() orderStudentGroup: FormGroup;
  @Input() orderReasons: any[];
  @Input() isTemplateFilled = true;
  @Input() isActionDisabled = false;

  @Output() onStudentAdd: EventEmitter<void> = new EventEmitter<void>();
  @Output() onStudentDelete: EventEmitter<void> = new EventEmitter<void>();
  @Output() onStudentEdit: EventEmitter<void> = new EventEmitter<void>();

  private defaultExpelReasonId = 0;
  private applicationReason = APPLICATION_REASON;

  get isVoluntarily(): boolean {
    return this.orderStudentGroup.get('orderReason').value === this.applicationReason;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this._getFirstReasonChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const reasons =  changes.orderReasons;
    if (reasons && reasons.currentValue) {
      const id = reasons.currentValue.find(elem => elem.name === this.applicationReason).id;
      this.orderStudentGroup.get('orderReasonId').setValue(id);
    }
  }

  public onOrderReasonChange(value: string): void {
    const id = this.orderReasons.find(elem => elem.name === value).id;
    this.orderStudentGroup.get('orderReasonId').setValue(id);
    const orderApplication = this.orderStudentGroup.get('orderApplicationDate');
    this.isVoluntarily ? orderApplication.enable() : orderApplication.disable();
  }

  public onAddStudent(): void {
    this.isTemplateFilled = !this.isTemplateFilled;
    this.onStudentAdd.emit();
  }

  public onStudentSelect(student: Student) {
    this.orderStudentGroup.get('studentFullName').setValue(`${student.name} ${student.surname} ${student.patronimic}`);
  }

  public onTemplateEdit() {
    this.isTemplateFilled = !this.isTemplateFilled;
    this.onStudentEdit.emit();
  }

  public onTemplateDelete() {
    this.onStudentDelete.emit();
  }

  private _getFirstReasonChange(): void {
    this.orderStudentGroup.get('orderReason').valueChanges.pipe(first()).subscribe(id => this.defaultExpelReasonId = id)
  }
}
