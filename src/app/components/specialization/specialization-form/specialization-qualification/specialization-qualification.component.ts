import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';
import {BaseReactiveFormComponent} from '../../../shared/base-reactive-form/base-reactive-form.component';
import {QualificationEvents} from './models/qualification-events';
import {getId} from '../../../../models/basemodels/BaseEntity';

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

  private _events: QualificationEvents;
  qualifications: ProfessionalQualification[] = [];
  createBtnText: string;
  updateForm = false;

  constructor(
    private _service: QualificationService,
    formBuilder: FormBuilder
  ) {
    super();
    this.form = formBuilder.group({
      name: ['', Validators.required],
      nameEng: ['', Validators.required],
      code: ['', Validators.compose(
        [Validators.required, Validators.maxLength(10)])
      ]
    });
  }

  loadData(specializationId: number): void {
    this._events = new QualificationEvents(specializationId);
    if (specializationId) {
      this._service.getCurrent(specializationId)
        .subscribe((qualifications: ProfessionalQualification[]) => this.qualifications = qualifications);
    }
  }

  hasData(): boolean {
    return this.qualifications.length > 0;
  }

  save(specializationId: number = this._events.specializationId): void {
    this._events.specializationId = specializationId;
    if (this._events.hasData()) {
      this._service.save(this._events)
        .then(() => this._events.clear());
    }
  }

  create(): void {
    this.submit();
    if (this.form.invalid) {
      return;
    }
    this._service.create(this.form.getRawValue())
      .then((res: ProfessionalQualification) => this._events.addSelected(res.id))
      .then(() => {
        if (this.updateForm) {
          this.save();
        }
      });
  }

  changeQualification(quals: ProfessionalQualification[]): void {
    const qualIds = quals.map(getId);
    const initialIds = this.qualifications.map(getId);
    this.addSelected(qualIds, initialIds);
    this.addDeleted(qualIds, initialIds);
    this.qualifications = quals;
  }

  private addSelected(qualIds: number[], initialIds: number[]): void {
    const selectedIds = qualIds.filter(this.isSelected(initialIds));
    this._events.addSelected(...selectedIds);
  }

  private isSelected(initialIds: number[]) {
    return (qualId: number) => {
      return !initialIds.includes(qualId);
    }
  }

  private addDeleted(qualIds: number[], initialIds: number[]): void {
    const deletedIds = initialIds.filter(this.isDeleted(qualIds));
    this._events.addDeleted(...deletedIds);
  }

  private isDeleted(qualIds: number[]) {
    return (initialId: number) => {
      return !qualIds.includes(initialId);
    }
  }
}
