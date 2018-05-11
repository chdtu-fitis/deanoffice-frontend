import {Component, Input, ViewChild} from '@angular/core';
import {IAppModal} from '../../shared/modal.interface';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'specialization-modal',
  templateUrl: './specialization-modal.component.html',
  styleUrls: ['./specialization-modal.component.scss']
})
export class SpecializationModalComponent implements IAppModal {
  @Input() title: string;
  @ViewChild('modal') modal: ModalDirective;

  show(): void {
    this.modal.show();
  }

  hide(): void {
    this.modal.hide();
  }
}
