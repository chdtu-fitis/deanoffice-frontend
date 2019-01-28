import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {SpecializationService} from '../../../services/specialization.service';
import {SpecializationFormComponent} from '../specialization-form/specialization-form.component';
import {Specialization} from '../../../models/Specialization';

@Component({
  selector: 'update-specialization',
  templateUrl: './update-specialization.component.html',
  styleUrls: ['./update-specialization.component.scss']
})
export class UpdateSpecializationComponent {
  source: Specialization;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('form') form: SpecializationFormComponent;

  constructor(private specializationService: SpecializationService) { }

  getTitle(): string {
    let name: string = (this.source) ? this.source.name : '';
    name = (name) ? `${name} (${this.source.degree.name})` : '';
    return `Оновлення спеціалізації: ${name}`;
  }

  openModal(sourceId: number): void {
    this.specializationService.getById(sourceId)
      .subscribe((source: Specialization) => {
        this.source = source;
        this.form.setInitialData(this.source);
        this.modal.show();
      });
  }

  hideModal(): void {
    this.modal.hide();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid()) {
      return;
    }
    const specialization = this.form.getValue();
    this.specializationService
      .update(specialization)
      .then(() => this.form.saveCompetenciesAndQualification(this.source.id))
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }
}
