import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {FormGroup} from '@angular/forms';
import {Specialization} from '../../../models/Specialization';
import {SpecializationService} from '../../../services/specialization.service';
import {SpecializationComponent} from '../specialization.component';

@Component({
  selector: 'recovery-specialization',
  templateUrl: './recovery-specialization.component.html',
  styleUrls: ['./recovery-specialization.component.scss']
})
export class RecoverySpecializationComponent {
  @Output() showErrorAlert: EventEmitter<any> = new EventEmitter<any>();
  @Output() recoverySpecialization: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;

  specialization: Specialization;

  form = new FormGroup({});

  constructor(
    private specializationService: SpecializationService,
    private specializationComponent: SpecializationComponent,
  ) { }

  openModal(items: Specialization): void {
    this.specialization = items;
    this.modal.show();
  }

  submit(): void {
    this.specializationService
      .restore(this.specialization.id)
      .subscribe(() => {
        this.recoverySpecialization.emit(null);
        this.modal.hide()
      });
  }

  hideModal(): void {
    this.modal.hide();
  }
}
