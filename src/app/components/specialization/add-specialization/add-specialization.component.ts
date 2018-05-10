import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {SpecializationService} from '../../../services/specialization.service';
import {SpecializationFormComponent} from '../specialization-form/specialization-form.component';

@Component({
  selector: 'add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.scss']
})
export class AddSpecializationComponent implements IAppModal {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalDirective;
  @ViewChild('specializationForm') specializationForm: SpecializationFormComponent;

  constructor(private specializationService: SpecializationService) { }

  openModal(): void {
    this.modal.show();
  }

  hideModal(): void {
    this.specializationForm.reset();
    this.modal.hide();
  }

  submit(): void {
    if (this.specializationForm.invalid()) {
      return;
    }
    this.specializationService
      .create(this.specializationForm.getValue())
      .then(() => {
        this.onSubmit.emit(null);
        this.modal.hide();
      });
  }
}
