import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';
import {BaseReactiveFormComponent} from '../../../shared/base-reactive-form/base-reactive-form.component';
import {QualificationEvents} from '../models/qualification-events';
import {getId} from '../../../../models/basemodels/BaseEntity';
import {QualificationForSpecialization, QualificationForSpecializationId} from '../models/QualificationForSpecialization';

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
  private qualificationForSpecializationsIds: QualificationForSpecializationId[] = [];
  canEdit = true;
  qualifications: ProfessionalQualification[] = [];
  createBtnText: string;
  updateForm = false;
  qualificationsYear: number;

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
      this._service.getCurrent(specializationId).subscribe(this.setInitialData.bind(this));
      this._service.canEdit(specializationId).subscribe((canEdit: boolean) => this.canEdit = canEdit);
    }
  }

  private setInitialData(qualificationForSpecializations: QualificationForSpecialization[]): void {
    this.qualificationForSpecializationsIds = qualificationForSpecializations.map(this.getQualificationForSpecializationId);
    this.qualificationsYear = this.getYear(qualificationForSpecializations);
      this.qualifications = qualificationForSpecializations
      .map((qfs: QualificationForSpecialization) => qfs.professionalQualification);
  }

  private getYear(qualificationForSpecializations: QualificationForSpecialization[]): number {
    const firstQualificationForSpecialization = qualificationForSpecializations[0];
    if (firstQualificationForSpecialization) {
      return firstQualificationForSpecialization.year;
    }
    return 0;
  }

  private getQualificationForSpecializationId(
    qualificationForSpecialization: QualificationForSpecialization
  ): QualificationForSpecializationId {
    return {
      id: qualificationForSpecialization.id,
      qid: qualificationForSpecialization.professionalQualification.id
    } as QualificationForSpecializationId;
  }

  hasData(): boolean {
    return this.qualifications.length > 0;
  }

  save(specializationId: number = this._events.specializationId): void {
    this._events.specializationId = specializationId;
    if (this._events.hasData()) {
      this._service.save(this._events)
        .then(() => this._events.clear())
        .then(() => this.loadData(this._events.specializationId));
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
    this.addSelected(qualIds);
    this.addDeleted(qualIds);
    this.canEdit = true;
    this.qualifications = quals;
  }

  private addSelected(qualIds: number[]): void {
    const initialIds = this.qualifications.map(getId);
    const selectedIds = qualIds.filter(this.isSelected(initialIds));
    this._events.addSelected(...selectedIds);
  }

  private isSelected(initialIds: number[]) {
    return (qualId: number) => {
      return !initialIds.includes(qualId);
    }
  }

  private addDeleted(qualIds: number[]): void {
    const deletedIds = this.qualificationForSpecializationsIds
      .filter(this.isDeleted(qualIds))
      .map(getId);
    this._events.addDeleted(...deletedIds);
  }

  private isDeleted(qualIds: number[]) {
    return (qfsId: QualificationForSpecializationId) => {
      return !qualIds.includes(qfsId.qid);
    }
  }
}
