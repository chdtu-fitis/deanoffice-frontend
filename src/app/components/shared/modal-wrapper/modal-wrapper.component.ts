import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IAppModal} from '../modal.interface';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal-wrapper.html',
  styleUrls: ['./modal-wrapper.scss']
})
export class ModalWrapperComponent implements IAppModal {
  @Input() heading: string;
  @Input() modalStyles;
  @Output() hideModal: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalDirective;

  show(): void {
    this.modal.show();
  }

  emitHide() {
    this.hideModal.emit(null);
  }

  hide(): void {
    this.modal.hide();
  }

  stopPropagation() {
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
  }

}
