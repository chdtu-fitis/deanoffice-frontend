import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {ModalDirective} from 'ngx-bootstrap';

import {OrdersService} from '../../../services/orders.service';

@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  @ViewChild('modal', {static: false}) modal: ModalDirective;

  public creatOrderForm: FormGroup;
  public orderTypes;
  constructor(private fb: FormBuilder,
              private _ordersService: OrdersService) { }

  async ngOnInit() {
    this._initForm();

    this.orderTypes = await this._ordersService.getOrderTypes().toPromise();

  }

  public hideModal(): void {
    this.modal.hide();
  }

  public onSubmit(): void {

  }

  public changeOrderType(orderType): void {
    console.log(orderType);
  }

  private _initForm(): void {
    this.creatOrderForm = this.fb.group({
      orderType: ['Про зміну ім\'я']
    })
  }

}
