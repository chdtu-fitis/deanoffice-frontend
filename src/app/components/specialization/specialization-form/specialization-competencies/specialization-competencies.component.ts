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
  private _id: number;
  competenciesIsLoading = false;
  competencies: string;
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
          this._id = competencies.id;
          this.competencies = competencies['competencies'];
          this.competenciesIsLoading = false;
        });
    }
  }

  enableEdit(): void {
    this.edit = true;
  }

  save() {
    if (this.competencies && !this.onlyCreating) {
      this._specializationService.updateCompetenciesUkr(this._id, this.competencies);
      return;
    }
  }

  isShowField(): boolean {
    return !this.competenciesIsLoading || this.onlyCreating;
  }

  getValue(): string {
    return this.competencies;
  }
}
