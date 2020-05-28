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
  @Output() updateSpecialization: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;
  @ViewChild('form', { static: false }) form: SpecializationFormComponent;

  constructor(private specializationService: SpecializationService) { }

  getTitle(): string {
    let name: string = (this.source) ? this.source.name : '';
    name = (name) ? `${name} (${this.source.degree.name})` : '';
    return `Оновлення освітньої програми: ${name}`;
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
    this.specializationService
      .update(this.form.getValue())
      .then((specialization) => this.updateSpecialization.emit(specialization))
      .then(() => this.form.saveCompetenciesAndQualification(this.source.id))
      .then(() => this.hideModal())
      .catch(null);
  }
}
