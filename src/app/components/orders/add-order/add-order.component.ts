import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  @ViewChild('modal') modal: ModalDirective;
  constructor() { }

  ngOnInit() {
  }

  hideModal() {
    this.modal.hide();
  }

}
