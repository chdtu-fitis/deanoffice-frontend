import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent  {
  @ViewChild('modal') childModal: ModalDirective;

  showModal() {
    this.childModal.show();
  }

  hideModal() {
    this.childModal.hide();
  }
}
