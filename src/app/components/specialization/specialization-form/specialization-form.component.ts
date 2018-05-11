import {Component, Input, OnInit} from '@angular/core';
import {Department} from '../../../models/Department';
import {Degree} from '../../../models/Degree';
import {Speciality} from '../../../models/Speciality';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {FormBuilder, Validators} from '@angular/forms';
import {DegreeService} from '../../../services/degree.service';
import {SpecialityService} from '../../../services/speciality.service';
import {DepartmentService} from '../../../services/department.service';
import {Specialization} from '../../../models/Specialization';

@Component({
  selector: 'specialization-form',
  templateUrl: './specialization-form.component.html',
  styleUrls: ['./specialization-form.component.scss']
})
export class SpecializationFormComponent extends BaseReactiveFormComponent implements OnInit {
  degrees: Degree[] = [];
  specialities: Speciality[] = [];
  departments: Department[] = [];
  data: Specialization;
  controlsConfig = {
    name: ['', Validators.required],
    nameEng: '',
    specialityId: ['', Validators.required],
    degreeId: ['', Validators.required],
    departmentId: '',
    qualification: '',
    qualificationEng: '',
    paymentFulltime: '',
    paymentExtramural: '',
    educationalProgramHeadName: ['', Validators.required],
    educationalProgramHeadNameEng: ['', Validators.required],
    educationalProgramHeadInfo: ['', Validators.required],
    educationalProgramHeadInfoEng: ['', Validators.required],
    knowledgeAndUnderstandingOutcomes: '',
    knowledgeAndUnderstandingOutcomesEng: '',
    applyingKnowledgeAndUnderstandingOutcomes: '',
    applyingKnowledgeAndUnderstandingOutcomesEng: '',
    makingJudgementsOutcomes: '',
    makingJudgementsOutcomesEng: ''
  };

  constructor(
    formBuilder: FormBuilder,
    private degreeService: DegreeService,
    private specialityService: SpecialityService,
    private departmentService: DepartmentService
  ) {
    super();
    this.form = formBuilder.group(this.controlsConfig);
  }

  setInitialData(data: Specialization) {
    this.data = data;
  }

  ngOnInit() {
    this.degreeService.getDegrees().subscribe((degrees: Degree[]) => this.degrees = degrees);
    this.specialityService.getSpecialities()
      .subscribe((specialities: Speciality[]) => this.specialities = specialities);
    this.departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
  }

  reset() {
    this.form.reset();
  }

  invalid(): boolean {
    super.submit();
    if (this.form.invalid) {
      alert('Перевірте правильність вводу даних');
    }
    return this.form.invalid;
  }

  getValue(): Specialization {
    return this.form.getRawValue() as Specialization;
  }
}
