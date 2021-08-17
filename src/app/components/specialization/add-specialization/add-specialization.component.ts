import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {SpecializationService} from '../../../services/specialization.service';
import {SpecializationFormComponent} from '../specialization-form/specialization-form.component';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.scss']
})
export class AddSpecializationComponent {
  @Output() addSpecialization: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;
  @ViewChild('form', { static: false }) form: SpecializationFormComponent;

  constructor(private specializationService: SpecializationService) { }

  openModal(): void {
    this.form.setInitialData();
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid()) {
      return;
    }
    this.specializationService
      .create(this.form.getValue())
      .then((specialization) => {
        this.form.saveCompetenciesAndQualification(specialization['id'] as number);
        this.addSpecialization.emit(specialization)
      })
      .then(() => this.hideModal())
      .catch(null);
  }
}
