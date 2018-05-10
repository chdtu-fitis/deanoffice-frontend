import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {IAppModal} from '../../shared/modal.interface';
import {ModalDirective} from 'ngx-bootstrap';
import {Specialization} from '../../../models/Specialization';
import {SpecializationService} from '../../../services/specialization.service';

@Component({
  selector: 'delete-specialization',
  templateUrl: './delete-specialization.component.html',
  styleUrls: ['./delete-specialization.component.scss']
})
export class DeleteSpecializationComponent implements IAppModal {
  items: Specialization[] = [];
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalDirective;

  constructor(private specializationService: SpecializationService) { }

  openModal(items: Specialization[]): void {
    this.items = items;
    this.modal.show();
  }

  remove(itemIndex: number): void {
    this.items.splice(itemIndex, 1);
  }

  submit(): void {
    const itemIds: number[] = this.items.map((item: Specialization) => item.id);
    this.specializationService
      .delete(itemIds)
      .then(() => {
        this.onSubmit.emit(null);
        this.modal.hide()
      });
  }

  hideModal(): void {
    this.modal.hide();
  }
}
