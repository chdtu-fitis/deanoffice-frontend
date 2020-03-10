import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {orderTypes} from '../moc';

@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  @ViewChild('modal', {static: false}) modal: ModalDirective;

  public orderTypes = orderTypes;
  constructor() { }


  ngOnInit() {
  }

  hideModal() {
    this.modal.hide();
  }

  changeOrderType(orderType) {
  }

}
