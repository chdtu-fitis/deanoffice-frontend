import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent  {
  isModalShown: boolean;
  @ViewChild('modal') childModal: ModalDirective;

  showModal() {
    this.isModalShown = true;
  }

  hideModal() {
    this.childModal.hide();
  }

  onHidden(): void {
    this.isModalShown = false;
  }
}
