import { Component, OnInit } from '@angular/core';
import {SpecializationService} from '../../services/specialization.service';
import {Specialization} from '../../models/Specialization';

@Component({
  selector: 'specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.scss']
})
export class SpecializationComponent implements OnInit {
  specializations: Specialization[] = [];
  selectedSpecializations: Specialization[] = [];
  loading: boolean;
  searchField: string;
  private actual: boolean;
  constructor(private specializationService: SpecializationService) { }

  ngOnInit() {
    this.getSpecializations(true);
  }

  getSpecializations(actual: boolean): void {
    this.loading = true;
    this.actual = actual;
    this.specializationService.getSpecializations(actual).subscribe((specializations: Specialization[]) => {
      this.specializations = specializations;
      this.loading = false;
    });
  }

  deleteIsDisabled(): boolean {
    return this.selectedSpecializations.length === 0 || !this.actual;
  }

  updateIsDisabled(): boolean {
    return this.selectedSpecializations.length !== 1 || !this.actual;
  }

  selectSpecializations(specializations: Specialization[]): void {
    this.selectedSpecializations = specializations;
  }

  updateDatatable(): void {
    this.getSpecializations(true);
  }
}
