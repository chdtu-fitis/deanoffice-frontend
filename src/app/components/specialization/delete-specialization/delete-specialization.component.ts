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
  @Input() selectedItems: Specialization[] = [];
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalDirective;

  constructor(private specializationService: SpecializationService) { }

  openModal(): void {
    this.modal.show();
  }

  submit(): void {
    const itemIds: number[] = this.selectedItems.map((item: Specialization) => item.id);
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
