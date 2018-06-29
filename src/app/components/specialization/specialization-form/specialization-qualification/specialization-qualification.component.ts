import { Component } from '@angular/core';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';

@Component({
  selector: 'specialization-qualification',
  templateUrl: './specialization-qualification.component.html',
  styleUrls: ['./specialization-qualification.component.scss']
})
export class SpecializationQualificationComponent {
  qualification: ProfessionalQualification;

  constructor(private _service: QualificationService) {}

  loadData(specializationId: number): void {
    if (specializationId) {
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
}
