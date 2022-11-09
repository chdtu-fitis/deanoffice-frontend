import {Component, Input, OnInit} from '@angular/core';
import {AcquiredCompetencies} from '../models/acquired-competencies';
import {AcquiredCompetenciesService} from '../services/acquired-competencies.service';
import {Lang} from '../enums/lang.enum';

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
  isLoaded = false;
  isLoading = false;
  competencies: string;
  editing: boolean;
  creating: boolean;

  constructor(private _service: AcquiredCompetenciesService) {}

  ngOnInit() {
    this.editing = this.creating = this.onlyCreating;
  }

  getCompetencies() {
    if (!this.isLoaded && !this.onlyCreating) {
      this.isLoading = true;
      this._service.getBySpecializationAndLang(this.specializationId, this.lang)
        .subscribe((competencies: AcquiredCompetencies) => {
          this._id = competencies.id;
          const fieldName: string = (this.lang === Lang.UKR) ? 'competencies' : 'competenciesEng';
          this.competencies = competencies[fieldName];
          this.isLoading = false;
          this.isLoaded = true;
        });
    }
  }

  enableEdit(): void {
    this._service.isExist(this.specializationId)
      .subscribe((isExist) => {
        if (!isExist) {
          alert('Компетентності для цієї освітньої програми відсутні. Потрібно створити нові!');
        } else {
          this.editing = isExist;
          this.creating = !isExist;
        }
      });
  }

  save() {
    const hasData: boolean = (this.isLoaded || Boolean(this.competencies));
    if (hasData && this.editing) {
      this._service.updateCompetencies(this._id, this.competencies, this.lang)
        .then(() => this.isLoaded = false, null);
    }
  }

  isShowField(): boolean {
    return !this.isLoading || this.onlyCreating;
  }

  getValue(): string {
    return this.competencies;
  }

  enableCreating() {
    this._service.isNotExistForCurrentYear(this.specializationId)
      .subscribe((isNotExist) => {
        if (!isNotExist) {
          alert('Компетентності для цієї освітньої програми вже існують. Дозволяється редагувати лише поточні!');
        } else {
          this.editing = !isNotExist;
          this.creating = isNotExist;
        }
      });
  }
}
