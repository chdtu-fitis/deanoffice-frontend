import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {SpecializationService} from '../../../services/specialization.service';
import {SpecializationFormComponent} from '../specialization-form/specialization-form.component';
import {SpecializationModalComponent} from '../specialization-modal/specialization-modal.component';

@Component({
  selector: 'add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.scss']
})
export class AddSpecializationComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: SpecializationModalComponent;
  @ViewChild('form') form: SpecializationFormComponent;

  constructor(private specializationService: SpecializationService) { }

  openModal(): void {
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
      .then((res) => this.form.saveCompetencies(res['id'] as number))
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }
}
