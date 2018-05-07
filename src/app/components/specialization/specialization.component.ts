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
  constructor(private specializationService: SpecializationService) { }

  ngOnInit() {
    this.specializationService.getSpecializations()
      .subscribe((specializations: Specialization[]) => this.specializations = specializations);
  }
}
