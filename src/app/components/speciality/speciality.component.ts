import { Component, OnInit } from '@angular/core';
import { SpecialityService } from '../../services/speciality.service';
import { Speciality } from '../../models/Speciality';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: [ './speciality.component.scss' ]
})
export class SpecialityComponent implements OnInit {

  buttonText = 'Показати неактуальні';
  isActual = true;
  selected: Speciality[] = [];
  specialities: Speciality[] = [];
  rows: Speciality[] = [];
  columns = [
    {
      name: 'Шифр',
      prop: 'code' 
    },
    {
      name: 'Назва',
      prop: 'name' 
    },
    {
      name: 'Назва Англійською',
      prop: 'nameEng'
    },
    {
      name: 'Галузь Знань',
      prop: 'fieldOfStudy' 
    },
    {
      name: 'Галузь Знань Англійською',
      prop: 'fieldOfStudyEng'
    }
  ];

  constructor(private specialityService: SpecialityService) {}

  ngOnInit() {
    this.getSpecialities();
  }

  getSpecialities() {
    this.specialityService.getSpecialities()
      .subscribe((speciality: Speciality[]) => {
        this.specialities = speciality;
        this.rows = speciality.filter(value => value.active === this.isActual);
      });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  actual() {
    this.isActual = !this.isActual;
    this.buttonText = this.isActual ? 'Показати неактуальні' : 'Показати актуальні';
    this.rows = this.specialities.filter(value => value.active === this.isActual);
  }
}
