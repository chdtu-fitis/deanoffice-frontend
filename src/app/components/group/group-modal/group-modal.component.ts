import {
  Component, EventEmitter, Input, Output, ViewChild 
} from '@angular/core';
import { IAppModal } from '../../shared/modal.interface';
import { ModalDirective } from 'ngx-bootstrap';
import { ModalMargin } from './models/modal-margin';

@Component({
  selector: 'group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: [ './group-modal.component.scss' ]
})
export class GroupModalComponent implements IAppModal {
  @Input() title: string;
  @Input() margin: ModalMargin = new ModalMargin();
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
