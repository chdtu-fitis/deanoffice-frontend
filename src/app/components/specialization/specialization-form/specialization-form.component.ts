import {Component, OnInit, ViewChild} from '@angular/core';
import {Department} from '../../../models/Department';
import {Degree} from '../../../models/Degree';
import {Speciality} from '../../../models/Speciality';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {FormBuilder, Validators} from '@angular/forms';
import {DegreeService} from '../../../services/degree.service';
import {SpecialityService} from '../../../services/speciality.service';
import {DepartmentService} from '../../../services/department.service';
import {Specialization} from '../../../models/Specialization';
import {TabDirective, TabsetComponent} from "ngx-bootstrap";

@Component({
  selector: 'specialization-form',
  templateUrl: './specialization-form.component.html',
  styleUrls: ['./specialization-form.component.scss']
})
export class SpecializationFormComponent extends BaseReactiveFormComponent implements OnInit {
  degrees: Degree[] = [];
  specialities: Speciality[] = [];
  departments: Department[] = [];
  @ViewChild('tabset') tabset: TabsetComponent;

  constructor(
    private formBuilder: FormBuilder,
    private degreeService: DegreeService,
    private specialityService: SpecialityService,
    private departmentService: DepartmentService
  ) {
    super();
    this.form = this.formBuilder.group({
      // name: ['', Validators.required],
      name: '',
      nameEng: '',
      specialityId: ['', Validators.required],
      degreeId: ['', Validators.required],
      departmentId: '',
      qualification: '',
      qualificationEng: '',
      paymentFulltime: '',
      paymentExtramural: '',
      // educationalProgramHeadName: ['', Validators.required],
      // educationalProgramHeadNameEng: ['', Validators.required],
      // educationalProgramHeadInfo: ['', Validators.required],
      // educationalProgramHeadInfoEng: ['', Validators.required],
      educationalProgramHeadName: '',
      educationalProgramHeadNameEng: '',
      educationalProgramHeadInfo: '',
      educationalProgramHeadInfoEng: '',
    });
  }

  setInitialData(data: Specialization) {
    this.form = this.formBuilder.group({
      // name: [data.name, Validators.required],
      name: data.name,
      nameEng: data.nameEng,
      specialityId: [data.specialityId, Validators.required],
      degreeId: [data.degreeId, Validators.required],
      departmentId: data.departmentId,
      qualification: data.qualification,
      qualificationEng: data.qualificationEng,
      paymentFulltime: data.paymentFulltime,
      paymentExtramural: data.paymentExtramural,
      // educationalProgramHeadName: [data.educationalProgramHeadName, Validators.required],
      // educationalProgramHeadNameEng: [data.educationalProgramHeadNameEng, Validators.required],
      // educationalProgramHeadInfo: [data.educationalProgramHeadInfo, Validators.required],
      // educationalProgramHeadInfoEng: [data.educationalProgramHeadInfoEng, Validators.required],
      educationalProgramHeadName: data.educationalProgramHeadName,
      educationalProgramHeadNameEng: data.educationalProgramHeadNameEng,
      educationalProgramHeadInfo: data.educationalProgramHeadInfo,
      educationalProgramHeadInfoEng: data.educationalProgramHeadInfoEng,

      knowledgeAndUnderstandingOutcomes: data.knowledgeAndUnderstandingOutcomes,
      knowledgeAndUnderstandingOutcomesEng: data.knowledgeAndUnderstandingOutcomesEng,
      applyingKnowledgeAndUnderstandingOutcomes: data.applyingKnowledgeAndUnderstandingOutcomes,
      applyingKnowledgeAndUnderstandingOutcomesEng: data.applyingKnowledgeAndUnderstandingOutcomesEng,
      makingJudgementsOutcomes: data.makingJudgementsOutcomes,
      makingJudgementsOutcomesEng: data.makingJudgementsOutcomesEng
    });
  }

  ngOnInit() {
    this.degreeService.getDegrees().subscribe((degrees: Degree[]) => this.degrees = degrees);
    this.specialityService.getSpecialities()
      .subscribe((specialities: Speciality[]) => this.specialities = specialities);
    this.departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
  }

  reset() {
    this.selectTap(0);
    this.form.reset();
  }

  selectTap(tabIndex: number): void {
    this.tabset.tabs[tabIndex].active = true;
  }

  invalid(): boolean {
    super.submit();
    if (this.form.invalid) {
      alert('Перевірте введені дані на правильність');
    }
    return this.form.invalid;
  }

  getValue(): Specialization {
    const s: Specialization = this.form.getRawValue() as Specialization;
    return {
      ...s,
      name: this.stringValue(s.name),
      paymentExtramural: this.numberValue(s.paymentExtramural),
      paymentFulltime: this.numberValue(s.paymentFulltime),
      educationalProgramHeadName: this.stringValue(s.educationalProgramHeadName),
      educationalProgramHeadNameEng: this.stringValue(s.educationalProgramHeadNameEng),
      educationalProgramHeadInfo: this.stringValue(s.educationalProgramHeadInfo),
      educationalProgramHeadInfoEng: this.stringValue(s.educationalProgramHeadInfoEng)
    } as Specialization;
  }

  private numberValue(value: number): number {
    return this.value(value, 0) as number
  }

  private value(value: number | string, defaultValue: number | string): number | string {
    return (value) ? value : defaultValue;
  }

  private stringValue(value: string): string {
    return this.value(value, '') as string
  }
}
