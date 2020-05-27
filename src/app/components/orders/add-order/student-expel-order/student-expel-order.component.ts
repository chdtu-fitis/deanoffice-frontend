import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-deduction-order',
  templateUrl: './student-expel-order.component.html',
  styleUrls: ['./student-expel-order.component.scss']
})
export class StudentExpelOrderComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: false}) modal: ModalDirective;

  @Output() orderClose$: EventEmitter<void> = new EventEmitter<void>();

  public deductionOrder: FormGroup;

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
    this.deductionOrder = this.fb.group({
    })
  }

}
