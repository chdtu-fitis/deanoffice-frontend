import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';

@Component({
  selector: 'add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.scss']
})
export class AddSpecializationComponent implements IAppModal {
  @ViewChild('modal') modal: ModalDirective;
  constructor() { }

  openModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
