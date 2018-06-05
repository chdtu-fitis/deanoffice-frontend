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
  specialization: Specialization;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalDirective;

  constructor(private specializationService: SpecializationService) { }

  openModal(item: Specialization): void {
    this.specialization = item;
    this.modal.show();
  }

  submit(): void {
    const IsConfirm = confirm('Ви дійсно бажаєте видалити обрану спеціалізацю?');
    if (IsConfirm) {
      this.specializationService
        .delete(this.specialization.id)
        .then(() => {
          this.onSubmit.emit(null);
          this.modal.hide()
        });
    }
  }

  hideModal(): void {
    this.modal.hide();
  }
}
