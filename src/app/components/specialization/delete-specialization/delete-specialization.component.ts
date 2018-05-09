import {Component, ViewChild} from '@angular/core';
import {IAppModal} from '../../shared/modal.interface';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'delete-specialization',
  templateUrl: './delete-specialization.component.html',
  styleUrls: ['./delete-specialization.component.scss']
})
export class DeleteSpecializationComponent implements IAppModal {
  @ViewChild('modal') modal: ModalDirective;

  openModal(): void {
    this.modal.show()
  }

  submit(): void {
    this.modal.hide();
  }

  hideModal(): void {
    this.modal.hide();
  }
}
