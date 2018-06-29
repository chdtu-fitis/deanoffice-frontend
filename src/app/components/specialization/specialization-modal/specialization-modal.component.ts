import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IAppModal} from '../../shared/modal.interface';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'specialization-modal',
  templateUrl: './specialization-modal.component.html',
  styleUrls: ['./specialization-modal.component.scss']
})
export class SpecializationModalComponent implements IAppModal {
  @Input() title: string;
  @Input() padding: {top: string, left: string, bottom: string, right: string} = {top: '0', left: '0', bottom: '0', right: '0'};
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

  getPadding() {
    return {
      'padding-top': this.padding.top || '0',
      'padding-left': this.padding.left || '0',
      'padding-bottom': this.padding.bottom || '0',
      'padding-right': this.padding.right || '0'
    };
  }
}
