import {Component, Input, OnInit} from '@angular/core';
import {SpecializationService} from '../../../../services/specialization.service';
import 'rxjs/add/operator/do';
import {AcquiredCompetencies} from '../../../../models/AcquiredCompetencies';

@Component({
  selector: 'specialization-competencies',
  templateUrl: './specialization-competencies.component.html',
  styleUrls: ['./specialization-competencies.component.scss']
})
export class SpecializationCompetenciesComponent implements OnInit {
  @Input() specializationId: number;
  @Input() onlyCreating: boolean;
  competenciesIsLoading = false;
  competencies: AcquiredCompetencies;
  edit: boolean;

  constructor(private _specializationService: SpecializationService) {}

  ngOnInit() {
    this.edit = this.onlyCreating;
  }

  getCompetencies() {
    const hasCompetencies: boolean = Boolean(this.competencies);
    if (!hasCompetencies && !this.onlyCreating) {
      this.competenciesIsLoading = true;
      this._specializationService.getCompetencies(this.specializationId)
        .subscribe((competencies: AcquiredCompetencies) => {
          this.competencies = competencies;
          this.competenciesIsLoading = false;
        });
    } else {
      this.competencies = new AcquiredCompetencies();
    }
  }

  enableEdit(): void {
    this.edit = true;
  }

  save() {
    if (this.competencies && !this.onlyCreating) {
      const {id, competencies} = this.competencies;
      this._specializationService.updateCompetenciesUkr(id, competencies);
      return;
    } else {
      alert('Create!')
    }
  }

  isShowField(): boolean {
    return (!this.competenciesIsLoading || this.onlyCreating) && Boolean(this.competencies);
  }
}
