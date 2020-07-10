import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalWrapperComponent} from "../../shared/modal-wrapper/modal-wrapper.component";

@Component({
  selector: 'order-sign',
  templateUrl: './order-sign.component.html',
  styleUrls: ['./order-sign.component.scss']
})
export class OrderSignComponent implements OnInit {

  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;

  private formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      number : new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]),
      date : new FormControl(null, Validators.required)
    })
  }

  ngOnInit() {
  }

  hideModal() {
    this.modal.hide();
  }

  showModal() {
    this.modal.show()
  }

  signedOrder() {
    const body = this.formGroup.getRawValue();

  }

}
