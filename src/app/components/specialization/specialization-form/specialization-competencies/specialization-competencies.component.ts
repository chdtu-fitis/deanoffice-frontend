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
  edit = false;

  constructor(private _specializationService: SpecializationService) {
  }

  getCompetencies() {
    const hasCompetencies: boolean = Boolean(this.competencies);
    if (!hasCompetencies) {
      this.competenciesIsLoading = true;
      this._specializationService.getCompetencies(this.specializationId)
        .subscribe((competencies: AcquiredCompetencies) => {
          this.competencies = competencies;
          this.competenciesIsLoading = false;
        });
    }
  }

  enableEdit(): void {
    this.edit = true;
  }

  save() {
    if (this.competencies) {
      const {id, competencies} = this.competencies;
      this._specializationService.updateCompetenciesUkr(id, competencies);
    }
  }
}
