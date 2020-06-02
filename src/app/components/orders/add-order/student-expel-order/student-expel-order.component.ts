import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deduction-order',
  templateUrl: './student-expel-order.component.html',
  styleUrls: ['./student-expel-order.component.scss']
})
export class StudentExpelOrderComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: false}) modal: ModalDirective;

  @Output() orderClose$: EventEmitter<void> = new EventEmitter<void>();

  public orderReasons: any[];
  public expelStudentOrder: FormGroup;
  public expelStudents: FormArray;

  public isStudentTemplateAvailable = true;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this._initForm();
  }

  ngAfterViewInit() {
    this.modal.show();
  }

  public hideModal(): void {
    this.orderClose$.emit();
    this.modal.hide()
  }

  public expelNewStudent() {
    this.isStudentTemplateAvailable = true;
    this.expelStudents.push(
      this.fb.group({
      studentDegreeId: ['', Validators.required],
      orderReason: ['voluntarily'],
      studentFullName: [''],
      orderExpelDate: [null, Validators.required],
      orderApplicationDate: [null, Validators.required]
    }))
  }

  private _initForm() {
    this.expelStudentOrder = this.fb.group({
      expelStudents: this.fb.array([
        this.fb.group({
          studentDegreeId: ['', Validators.required],
          studentFullName: [''],
          orderReason: ['voluntarily'],
          orderExpelDate: [null, Validators.required],
          orderApplicationDate: [null, Validators.required]
        })
      ])
    });
    this.expelStudents = this.expelStudentOrder.get('expelStudents') as FormArray;
  }

  public onStudentAdd(): void {
    this.isStudentTemplateAvailable = false;
  }

  public onStudentDelete(index: number): void {
    this.expelStudents.removeAt(index);
  }

  public onStudentEdit(): void {
    this.isStudentTemplateAvailable = true;
  }
}
