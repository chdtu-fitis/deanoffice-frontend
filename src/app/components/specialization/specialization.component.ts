import {Component, OnInit} from '@angular/core';
import {SpecializationService} from '../../services/specialization.service';
import {Specialization} from '../../models/Specialization';

@Component({
  selector: 'specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent implements OnInit {
  specializations: Specialization[] = [];
  selectedSpecialization: Specialization;
  loading: boolean;
  searchField: string;
  private actual: boolean;

  constructor(private specializationService: SpecializationService) {}

  ngOnInit() {
    this.getSpecializations(true);
  }

  getSpecializations(actual: boolean): void {
    this.loading = true;
    this.actual = actual;
    this.specializationService.getSpecializations(actual).subscribe(
      (specializations: Specialization[]) => this.specializations = specializations,
      null,
      () => this.loading = false
    );
  }

  buttonIsDisabled(): boolean {
    return !this.selectedSpecialization || !this.actual;
  }

  selectSpecializations(selected: Specialization): void {
    this.selectedSpecialization = selected;
  }

  updateDatatable(): void {
    this.getSpecializations(true);
  }
}
