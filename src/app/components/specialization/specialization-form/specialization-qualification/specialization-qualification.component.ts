import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';
import {BaseReactiveFormComponent} from '../../../shared/base-reactive-form/base-reactive-form.component';
import {QualificationEvents} from '../models/qualification-events';
import {getId} from '../../../../models/basemodels/BaseEntity';
import {ChangeQualificationComponent} from './change-qualification/change-qualification.component';
import {
  QualificationForSpecialization,
  QualificationForSpecializationId
} from '../models/QualificationForSpecialization';

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
        this._service.getCurrent(specializationId).subscribe(this.setInitialData.bind(this));
      });
    }
  }

  private setInitialData(qualificationForSpecializations: QualificationForSpecialization[]): void {
    this.qualificationForSpecializationsIds = qualificationForSpecializations.map(getQualificationForSpecializationId);
    this.qualificationsYear = getYear(qualificationForSpecializations);
    this.qualifications = qualificationForSpecializations
      .map((qfs: QualificationForSpecialization) => qfs.professionalQualification);
    this.events.initialIds = this.qualifications.map(getId);
  }

  hasData(): boolean {
    return this.qualifications.length > 0;
  }

  save(specializationId: number = this.events.specializationId): void {
    this.events.specializationId = specializationId;
    this._service.save(this.events)
      .then(this.events.clear.bind(this.events))
      .then(() => this.loadData(this.events.specializationId));
  }

  create(): void {
    this.submit();
    if (this.form.invalid) {
      return;
    }
    this._service.create(this.form.getRawValue())
      .then((response: ProfessionalQualification) => {
        if (this.updateForm && this.canEdit) {
          this.events.selected.push(response.id);
          this.qualifications.push(response);
        }
      }).then(() => this.form.reset());
  }

  changeQualification(selected: ProfessionalQualification[]): void {
    const selectedIds = selected.map(getId);
    this.addSelected(selectedIds);
    this.addDeleted(selectedIds);
    this.canEdit = true;
    this.qualifications = selected;
  }

  private addSelected(selectedIds: number[]): void {
    this.events.selected = selectedIds
      .filter((selectedId) => !this.events.initialIds.includes(selectedId));
  }

  private addDeleted(selectedIds: number[]): void {
    this.events.deleted = this.qualificationForSpecializationsIds
      .filter(this.isDeleted(selectedIds).bind(this))
      .map(getId);
  }

  private isDeleted(selectedIds: number[]) {
    return (qfsId: QualificationForSpecializationId) => {
      return !selectedIds.includes(qfsId.qid);
    }
  }

  createForNewYear(): void {
    this.canEdit = true;
    this.qualificationForSpecializationsIds = this.events.initialIds = [];
    if (!this.changeModal.isOpen) {
      this.changeModal.open(this.qualifications);
    }
  }

  getCreateBtnDesc(): string {
    if (!this.updateForm) {
      return 'Створити';
    }
    return (this.canEdit) ? 'Створити та обрати' : 'Створити';
  }
}


function getYear(qualificationForSpecializations: QualificationForSpecialization[]): number {
  const firstQualificationForSpecialization = qualificationForSpecializations[0];
  if (firstQualificationForSpecialization) {
    return firstQualificationForSpecialization.year;
  }
  return 0;
}

function getQualificationForSpecializationId(
  qualificationForSpecialization: QualificationForSpecialization
): QualificationForSpecializationId {
  return {
    id: qualificationForSpecialization.id,
    qid: qualificationForSpecialization.professionalQualification.id
  } as QualificationForSpecializationId;
}
