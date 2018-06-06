import {Component, Input, OnInit} from '@angular/core';
import {SpecializationService} from '../../../../services/specialization.service';
import 'rxjs/add/operator/do';
import {AcquiredCompetencies} from '../../../../models/AcquiredCompetencies';
import {AcquiredCompetenciesService} from "../services/acquired-competencies.service";

@Component({
  selector: 'specialization-competencies',
  templateUrl: './specialization-competencies.component.html',
  styleUrls: ['./specialization-competencies.component.scss']
})
export class SpecializationCompetenciesComponent implements OnInit {
  @Input() specializationId: number;
  @Input() onlyCreating: boolean;
  private _id: number;
  private _isLoaded = false;
  isLoading = false;
  competencies: string;
  edit: boolean;

  constructor(private _acquiredCompetenciesService: AcquiredCompetenciesService) {}

  ngOnInit() {
    this.edit = this.onlyCreating;
  }

  getCompetencies() {
    if (!this._isLoaded && !this.onlyCreating) {
      this.isLoading = true;
      this._acquiredCompetenciesService.getCompetencies(this.specializationId)
        .subscribe((competencies: AcquiredCompetencies) => {
          this._id = competencies.id;
          this.competencies = competencies['competencies'];
          this.isLoading = false;
          this._isLoaded = true;
        });
    }
  }

  enableEdit(): void {
    this.edit = true;
  }

  save() {
    if (this.competencies && !this.onlyCreating) {
      this._acquiredCompetenciesService.updateCompetenciesUkr(this._id, this.competencies)
        .then(() => this._isLoaded = false, null);
      return;
    }
  }

  isShowField(): boolean {
    return !this.isLoading || this.onlyCreating;
  }

  getValue(): string {
    return this.competencies;
  }
}
