import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {Specialization} from '../../../models/Specialization';
import {SpecializationService} from '../../../services/specialization.service';

@Component({
  selector: 'delete-specialization',
  templateUrl: './delete-specialization.component.html',
  styleUrls: ['./delete-specialization.component.scss']
})
export class DeleteSpecializationComponent {
  specialization: Specialization;
  @Output() deleteSpecialization: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;

  constructor(private specializationService: SpecializationService) { }

  openModal(item: Specialization): void {
    this.specialization = item;
    this.modal.show();
  }

  submit(): void {
    this.specializationService
      .delete(this.specialization.id)
      .then(() => {
        this.deleteSpecialization.emit(null);
        this.modal.hide()
      });
  }

  hideModal(): void {
    this.modal.hide();
  }
}
