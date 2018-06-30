import {Component, Input} from '@angular/core';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseReactiveFormComponent} from '../../../shared/base-reactive-form/base-reactive-form.component';

@Component({
  selector: 'specialization-qualification',
  templateUrl: './specialization-qualification.component.html',
  styleUrls: ['./specialization-qualification.component.scss']
})
export class SpecializationQualificationComponent extends BaseReactiveFormComponent {
  @Input() set setFormType(updateForm: boolean) {
    this.updateForm = updateForm;
    this.createBtnText = (updateForm) ? 'Створити та обрати' : 'Створити';
  }
  private _alreadySaved = false;
  updateForm = false;
  specializationId: number;
  qualification: ProfessionalQualification;
  createBtnText: string;

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

  save(specializationId: number): void {
    if (this.hasData() && !this._alreadySaved) {
      this._service.setQualificationForSpecialization(specializationId, this.qualification.id);
      this._alreadySaved = true;
    }
  }

  create(): void {
    this.submit();
    if (this.form.invalid) {
      return;
    }
    this._service.create(this.form.getRawValue())
      .then(this.changeData)
      .then(() => {
        if (this.updateForm) {
          this.save(this.specializationId);
        }
      });
  }

  changeData(qualification: ProfessionalQualification) {
    this.qualification = qualification;
    this._alreadySaved = false;
  }
}
