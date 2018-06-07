import {Component, Input, OnInit} from '@angular/core';
import {AcquiredCompetencies} from '../../../../models/AcquiredCompetencies';
import {AcquiredCompetenciesService} from '../services/acquired-competencies.service';
import {Lang} from '../enums/lang.enum';
import 'rxjs/add/operator/do';

@Component({
  selector: 'specialization-competencies',
  templateUrl: './specialization-competencies.component.html',
  styleUrls: ['./specialization-competencies.component.scss']
})
export class SpecializationCompetenciesComponent implements OnInit {
  @Input() specializationId: number;
  @Input() onlyCreating: boolean;
  @Input() lang: Lang;
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
      this._acquiredCompetenciesService.getCompetencies(this.specializationId, this.lang)
        .subscribe((competencies: AcquiredCompetencies) => {
          this._id = competencies.id;
          const fieldName: string = (this.lang === Lang.UKR) ? 'competencies' : 'competenciesEng';
          this.competencies = competencies[fieldName];
          this.isLoading = false;
          this._isLoaded = true;
        });
    }
  }

  enableEdit(): void {
    this._acquiredCompetenciesService.isExist(this.specializationId)
      .subscribe((isExist) => {
        this.edit = isExist;
        if (!isExist) {
          alert('Компетенції для цієї спеціалізації відсутні. Потрібно створити нові!');
        }
      });
  }

  save() {
    const canSave: boolean = !this.onlyCreating && (this._isLoaded || Boolean(this.competencies));
    if (canSave) {
      this._acquiredCompetenciesService.updateCompetencies(this._id, this.competencies, this.lang)
        .then(() => this._isLoaded = false, null);
    }
  }

  isShowField(): boolean {
    return !this.isLoading || this.onlyCreating;
  }

  getValue(): string {
    return this.competencies;
  }
}
