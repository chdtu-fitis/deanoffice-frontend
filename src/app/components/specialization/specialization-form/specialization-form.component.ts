import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Department} from '../../../models/Department';
import {Degree} from '../../../models/Degree';
import {Speciality} from '../../../models/Speciality';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {FormBuilder, Validators} from '@angular/forms';
import {DegreeService} from '../../../services/degree.service';
import {SpecialityService} from '../../../services/speciality.service';
import {DepartmentService} from '../../../services/department.service';
import {Specialization} from '../../../models/Specialization';
import {TabsetComponent} from 'ngx-bootstrap';
import {SpecializationService} from '../../../services/specialization.service';
import "rxjs/add/operator/do";

@Component({
  selector: 'specialization-form',
  templateUrl: './specialization-form.component.html',
  styleUrls: ['./specialization-form.component.scss']
})
export class SpecializationFormComponent extends BaseReactiveFormComponent implements OnInit {
  @ViewChild('tabset') tabset: TabsetComponent;
  private _updateForm = false;
  private _initialData: Specialization = new Specialization();
  degrees: Degree[] = [];
  specialities: Speciality[] = [];
  departments: Department[] = [];
  competenciesIsLoading = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _degreeService: DegreeService,
    private _specialityService: SpecialityService,
    private _departmentService: DepartmentService,
    private _specializationService: SpecializationService
  ) {
    super();
    this.form = this._formBuilder.group({
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
    this._updateForm = true;
    this._initialData = data;
    this.form = this._formBuilder.group({
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
    });
  }

  ngOnInit() {
    this._degreeService.getDegrees().subscribe((degrees: Degree[]) => this.degrees = degrees);
    this._specialityService.getSpecialities()
      .subscribe((specialities: Speciality[]) => this.specialities = specialities);
    this._departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
  }

  getCompetencies() {
    if (this._updateForm) {
      const rawValue: Specialization = this.form.getRawValue() as Specialization;
      const hasCompetencies: boolean = Boolean(rawValue.competencies);
      if (!hasCompetencies) {
        this.competenciesIsLoading = true;
        this._specializationService.getCompetencies(this._initialData.id)
          .do(() => this.competenciesIsLoading = false)
          .subscribe(
            (competencies) => this._setCompetencies(competencies['value'] as string),
            () => this._setCompetencies('')
          );
      }
    }
  }

  private _setCompetencies(competencies: string): void {
    console.log(competencies);
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
      id: this._initialData.id,
      name: this._stringValue(s.name),
      active: this._initialData.active,
      paymentExtramural: this._numberValue(s.paymentExtramural),
      paymentFulltime: this._numberValue(s.paymentFulltime),
      educationalProgramHeadName: this._stringValue(s.educationalProgramHeadName),
      educationalProgramHeadNameEng: this._stringValue(s.educationalProgramHeadNameEng),
      educationalProgramHeadInfo: this._stringValue(s.educationalProgramHeadInfo),
      educationalProgramHeadInfoEng: this._stringValue(s.educationalProgramHeadInfoEng)
    } as Specialization;
  }

  private _numberValue(value: number): number {
    return this._value(value, 0) as number
  }

  private _value(value: number | string, defaultValue: number | string): number | string {
    return (value) ? value : defaultValue;
  }

  private _stringValue(value: string): string {
    return this._value(value, '') as string
  }
}
