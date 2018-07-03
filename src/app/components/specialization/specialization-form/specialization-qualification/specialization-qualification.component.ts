import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';
import {BaseReactiveFormComponent} from '../../../shared/base-reactive-form/base-reactive-form.component';
import {QualificationEvents} from '../models/qualification-events';
import {getId} from '../../../../models/basemodels/BaseEntity';
import {QualificationForSpecialization, QualificationForSpecializationId} from '../models/QualificationForSpecialization';
import {SelectedQualification} from '../models/selected-qualification';
import {SelectionMode} from '../enums/selection-mode.enum';
import {ChangeQualificationComponent} from './change-qualification/change-qualification.component';

@Component({
  selector: 'specialization-qualification',
  templateUrl: './specialization-qualification.component.html',
  styleUrls: ['./specialization-qualification.component.scss']
})
export class SpecializationQualificationComponent extends BaseReactiveFormComponent {
  @Input() updateForm: boolean;
  @ViewChild('changeModal') changeModal: ChangeQualificationComponent;
  private events: QualificationEvents;
  private qualificationForSpecializationsIds: QualificationForSpecializationId[] = [];
  private selectionMode: SelectionMode;
  canEdit = true;
  qualifications: ProfessionalQualification[] = [];
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
    this.events = new QualificationEvents(specializationId);
    if (specializationId) {
      this._service.canEdit(specializationId).subscribe((canEdit: boolean) => {
        this.canEdit = canEdit;
        this.selectionMode = (canEdit) ? SelectionMode.ADD : SelectionMode.ALL;
        this._service.getCurrent(specializationId).subscribe(this.setInitialData.bind(this));
      });
    }
  }

  private setInitialData(qualificationForSpecializations: QualificationForSpecialization[]): void {
    this.qualificationForSpecializationsIds = qualificationForSpecializations.map(this.getQualificationForSpecializationId);
    this.qualificationsYear = this.getYear(qualificationForSpecializations);
      this.qualifications = qualificationForSpecializations
      .map((qfs: QualificationForSpecialization) => qfs.professionalQualification);
    if (this.selectionMode === SelectionMode.ALL) {
      this.events.addSelected(this.qualifications.map(getId));
      this.selectionMode = SelectionMode.ADD;
    }
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

  save(specializationId: number = this.events.specializationId): void {
    this.events.specializationId = specializationId;
    if (this.events.hasData()) {
      this._service.save(this.events)
        .then(() => this.events.clear())
        .then(() => this.loadData(this.events.specializationId));
    }
  }

  create(): void {
    this.submit();
    if (this.form.invalid) {
      return;
    }
    this._service.create(this.form.getRawValue())
      .then((response: ProfessionalQualification) => {
        if (this.updateForm && this.canEdit) {
          this.events.addSelected(response.id);
          this.qualifications.push(response);
        }
      }).then(() => this.form.reset());
  }

  changeQualification(selected: SelectedQualification): void {
    const qualIds = selected.qualifications.map(getId);
    if (selected.selectionMode === SelectionMode.ALL) {
      const ids: number[] = selected.qualifications.map(getId);
      this.events.addSelected(...ids);
    } else {
      this.addSelected(qualIds);
      this.addDeleted(qualIds);
    }
    this.canEdit = true;
    this.qualifications = selected.qualifications;
  }

  private addSelected(qualIds: number[]): void {
    const initialIds = this.qualifications.map(getId);
    const selectedIds = qualIds.filter(this.isSelected(initialIds));
    this.events.addSelected(...selectedIds);
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
    this.events.addDeleted(...deletedIds);
  }

  private isDeleted(qualIds: number[]) {
    return (qfsId: QualificationForSpecializationId) => {
      return !qualIds.includes(qfsId.qid);
    }
  }

  createForNewYear(): void {
    this.changeModal.open(this.qualifications);
    this.changeModal.createForNewYear();
    this.canEdit = true;
  }

  getCreateBtnDesc(): string {
    if (!this.updateForm) {
      return 'Створити';
    }
    return (this.canEdit) ? 'Створити та обрати' : 'Створити';
  }
}
