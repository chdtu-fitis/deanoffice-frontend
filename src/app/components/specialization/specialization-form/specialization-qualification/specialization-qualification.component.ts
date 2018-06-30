import {Component, Input} from '@angular/core';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseReactiveFormComponent} from "../../../shared/base-reactive-form/base-reactive-form.component";

@Component({
  selector: 'specialization-qualification',
  templateUrl: './specialization-qualification.component.html',
  styleUrls: ['./specialization-qualification.component.scss']
})
export class SpecializationQualificationComponent extends BaseReactiveFormComponent {
  @Input() showSaveBtn = false;
  specializationId: number;
  qualification: ProfessionalQualification;

  constructor(
    private _service: QualificationService,
    formBuilder: FormBuilder
  ) {
    super();
    this.form = formBuilder.group({
      name: ['', Validators.required],
      nameEng: ['', Validators.required],
      code: ['', Validators.compose([Validators.required, Validators.maxLength(10)])]
    });
  }

  loadData(specializationId: number): void {
    if (specializationId) {
      this.specializationId = specializationId;
      this._service.getLast(specializationId)
        .subscribe((qualification: ProfessionalQualification) => this.qualification = qualification);
    }
  }

  hasData(): boolean {
    if (!this.qualification) {
      return false;
    }
    return Object.keys(this.qualification).length > 0;
  }

  changeQualification(qualification: ProfessionalQualification) {
    this.qualification = qualification;
  }

  save(specializationId: number): void {
    this._service.setQualificationForSpecialization(specializationId, this.qualification.id);
  }

  createAndSet(): void {
    this.submit();
    if (this.form.invalid) {
      return;
    }
    this._service.create(this.form.getRawValue(), true, this.specializationId)
      .then((res: ProfessionalQualification) => this.qualification = res);
  }
}
