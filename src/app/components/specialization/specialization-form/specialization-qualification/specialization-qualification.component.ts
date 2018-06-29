import { Component } from '@angular/core';
import {QualificationService} from '../services/qualification.service';
import {ProfessionalQualification} from '../models/professional-qualification';

@Component({
  selector: 'specialization-qualification',
  templateUrl: './specialization-qualification.component.html',
  styleUrls: ['./specialization-qualification.component.scss'],
  providers: [QualificationService]
})
export class SpecializationQualificationComponent {
  qualification: ProfessionalQualification;

  constructor(private _service: QualificationService) {}

  loadData(specializationId: number = 0): void {
    this._service.getLast(specializationId)
      .subscribe((qualification: ProfessionalQualification) => this.qualification = qualification);
  }

  hasData(): boolean {
    if (!this.qualification) {
      return false;
    }
    return Object.keys(this.qualification).length > 0;
  }
}
