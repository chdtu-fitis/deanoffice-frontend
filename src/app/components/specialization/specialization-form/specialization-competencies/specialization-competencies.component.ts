import {Component, Input} from '@angular/core';
import {SpecializationService} from '../../../../services/specialization.service';
import 'rxjs/add/operator/do';
import {AcquiredCompetencies} from '../../../../models/AcquiredCompetencies';

@Component({
  selector: 'specialization-competencies',
  templateUrl: './specialization-competencies.component.html',
  styleUrls: ['./specialization-competencies.component.scss']
})
export class SpecializationCompetenciesComponent {
  @Input() specializationId: number;
  competenciesIsLoading = false;
  competencies: AcquiredCompetencies;

  constructor(private _specializationService: SpecializationService) {
  }

  getCompetencies() {
    const hasCompetencies: boolean = Boolean(this.competencies);
    if (!hasCompetencies) {
      this.competenciesIsLoading = true;
      this._specializationService.getCompetencies(this.specializationId)
        .do(() => this.competenciesIsLoading = false)
        .subscribe(
          (competencies: AcquiredCompetencies) => this._setCompetencies(competencies),
          () => this._setCompetencies()
        );
    }
  }

  private _setCompetencies(competencies?: AcquiredCompetencies): void {
    this.competencies = competencies;
  }
}
