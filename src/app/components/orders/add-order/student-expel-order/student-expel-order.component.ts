import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deduction-order',
  templateUrl: './student-expel-order.component.html',
  styleUrls: ['./student-expel-order.component.scss']
})
export class StudentExpelOrderComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: false}) modal: ModalDirective;

  @Output() orderClose$: EventEmitter<void> = new EventEmitter<void>();

  public expelStudentOrder: FormGroup;
  public expelStudents: FormArray;

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

  private _initForm() {
    this.expelStudentOrder = this.fb.group({
      expelStudents: this.fb.array([
        this.fb.group({
          id: '',
          name: ['', Validators.required],
          surname: ['', Validators.required],
          patronimic: ['', Validators.required],
          birthDate: ['', Validators.required],
          sex: ['', Validators.required],
        })
      ])
    });
    this.expelStudents = this.expelStudentOrder.get('expelStudents') as FormArray;
  }

}
