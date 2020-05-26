import {of, Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
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
import {SpecializationCompetenciesComponent} from './specialization-competencies/specialization-competencies.component';
import {AcquiredCompetencies} from './models/acquired-competencies';
import {AcquiredCompetenciesService} from './services/acquired-competencies.service';
import {Lang} from './enums/lang.enum';
import {SpecializationQualificationComponent} from './specialization-qualification/specialization-qualification.component';
import {TeacherService} from "../../../services/teacher.service";
import {Teacher} from "../../../models/Teacher";

const DEFAULT_DATE: Date = new Date(Date.parse('1980-01-01'));
const DEFAULT_NUMBER = 0;
const DEFAULT_STRING = '';

@Component({
  selector: 'specialization-form',
  templateUrl: './specialization-form.component.html',
  styleUrls: ['./specialization-form.component.scss']
})
export class SpecializationFormComponent extends BaseReactiveFormComponent implements OnInit {
  @Input() updateForm = false;
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  @ViewChild('competencies', { static: false }) competencies: SpecializationCompetenciesComponent;
  @ViewChild('competenciesEng', { static: false }) competenciesEng: SpecializationCompetenciesComponent;
  @ViewChild('qualification', { static: false }) qualification: SpecializationQualificationComponent;
  initialData: Specialization = new Specialization();
  degrees: Degree[] = [];
  specialities: Speciality[] = [];
  departments: Department[] = [];
  isShow = true;
  lang = Lang;

  teachersDataSource: Observable<any>;
  selectedGuarantorId;

  constructor(
    private _formBuilder: FormBuilder,
    private _degreeService: DegreeService,
    private _specialityService: SpecialityService,
    private _departmentService: DepartmentService,
    private _acquiredCompetenciesService: AcquiredCompetenciesService,
    private _teacherService: TeacherService
  ) {
    super();
    this.setInitialData();
    this.createTeachersDataSource();
  }

  // TODO Return validation for name (only ukr), programHead, certificate
  setInitialData(data: Specialization = new Specialization()) {
    this.initialData = data;
    this.form = this._formBuilder.group({
      name: data.name,
      nameEng: data.nameEng,
      code: data.code,
      specialityId: [data.specialityId, Validators.required],
      degreeId: [data.degreeId, Validators.required],
      departmentId: [data.departmentId, Validators.required],
      qualification: data.qualification,
      qualificationEng: data.qualificationEng,
      paymentFulltime: data.paymentFulltime,
      paymentExtramural: data.paymentExtramural,
      certificateNumber: data.certificateNumber,
      certificateDate: data.certificateDate,
      educationalProgramHeadName: data.educationalProgramHeadName,
      educationalProgramHeadNameEng: data.educationalProgramHeadNameEng,
      educationalProgramHeadInfo: data.educationalProgramHeadInfo,
      educationalProgramHeadInfoEng: data.educationalProgramHeadInfoEng,
    });
  }

  createTeachersDataSource() {
    this.teachersDataSource = Observable.create((observer: any) => {
      let guarantorInputValue = this.form.controls.educationalProgramHeadName.value;
      if (guarantorInputValue.length < 3) {
        return;
      }

      // clear the selected value if input value was changed after selection
      if (this.selectedGuarantorId) {
        this.selectedGuarantorId = null;
      }
      this._teacherService.getTeachersShortBySurnamePart(guarantorInputValue).subscribe((result: any) => {
        result.forEach(teacher => teacher.fullName = teacher.surname + " " + teacher.name + " " + teacher.patronimic);
        observer.next(result);
      });
    });
  }

  ngOnInit() {
    this._degreeService.getDegrees().subscribe((degrees: Degree[]) => this.degrees = degrees);
    this.setSpecialityToAllActiveInFaculty();
    this._departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
  }

  onSpecialityCheckboxChange(event: Event) {
    if ((event.target as HTMLInputElement).checked) {
      this.setSpecialityToAllActive();
    } else {
      this.setSpecialityToAllActiveInFaculty();
    }
  }

  setSpecialityToAllActive() {
    this._specialityService.getActiveSpecialities()
      .subscribe((specialities: Speciality[]) => this.specialities = specialities);
  }

  setSpecialityToAllActiveInFaculty() {
    this._specialityService.getSpecialities()
      .subscribe((specialities: Speciality[]) => this.specialities = specialities);
  }

  reset() {
    (document.getElementById('allSpecialityCheckbox') as HTMLInputElement).checked = false;
    this.setSpecialityToAllActiveInFaculty();
    this.selectTap(0);
    this.form.reset();
    this._destroyCompetenciesTabs();
  }

  private _destroyCompetenciesTabs() {
    this.isShow = false;
    setTimeout(() => this.isShow = true, 0);
  }

  selectTap(tabIndex: number): void {
    this.tabset.tabs[tabIndex].active = true;
  }

  invalid(): boolean {
    super.submit();
    if (this.form.invalid) {
      alert('Перевірте введені дані на правильність!');
    }
    return this.form.invalid;
  }

  getValue(): Specialization {
    const s: Specialization = this.form.getRawValue() as Specialization;
    return {
      ...s,
      id: this.initialData.id,
      name: s.name || DEFAULT_STRING,
      active: this.initialData.active,
      paymentExtramural: s.paymentExtramural || DEFAULT_NUMBER,
      paymentFulltime: s.paymentFulltime || DEFAULT_NUMBER,
      certificateNumber: s.certificateNumber || DEFAULT_STRING,
      certificateDate: s.certificateDate || DEFAULT_DATE,
      educationalProgramHeadName: s.educationalProgramHeadName || DEFAULT_STRING,
      educationalProgramHeadNameEng: s.educationalProgramHeadNameEng || DEFAULT_STRING,
      educationalProgramHeadInfo: s.educationalProgramHeadInfo || DEFAULT_STRING,
      educationalProgramHeadInfoEng: s.educationalProgramHeadInfoEng || DEFAULT_STRING
    } as Specialization;
  }

  saveCompetenciesAndQualification(specializationId: number) {
    this._saveCompetencies(specializationId);
    this._saveQualification(specializationId);
  }

  private _saveCompetencies(specializationId?: number) {
    if (this.updateForm) {
      if (this.competenciesEng.creating || this.competencies.creating) {
        this._createCompetencies();
        return;
      }
      this.competencies.save();
      this.competenciesEng.save();
      return;
    }
    this._createNewCompetencies(specializationId);
  }

  private _createCompetencies(): void {
    const acquiredCompetencies: AcquiredCompetencies = {
      specializationId: this.initialData.id
    } as AcquiredCompetencies;
    of(acquiredCompetencies).pipe(
      flatMap(this.setCompetencies(Lang.UKR)),
      flatMap(this.setCompetencies(Lang.ENG))
    ).subscribe((ac: AcquiredCompetencies) => {
      this._acquiredCompetenciesService.create(ac);
    });
  }

  private setCompetencies(lang: Lang): (ac: AcquiredCompetencies) => Observable<AcquiredCompetencies> {
    return (ac: AcquiredCompetencies) => {
      const fieldName: string = (lang === Lang.UKR) ? 'competencies' : 'competenciesEng';
      const competencies: SpecializationCompetenciesComponent = this.getCompetenciesByLang(lang);
      if (competencies.isLoaded) {
        return of({
          ...ac,
          [fieldName]: competencies.getValue() || ''
        } as AcquiredCompetencies);
      } else {
        return this._acquiredCompetenciesService.getBySpecializationAndLang(this.initialData.id, lang).pipe(
          map((_ac: AcquiredCompetencies) => {
            return {
              ...ac,
              [fieldName]: _ac[fieldName] || ''
            } as AcquiredCompetencies;
          })
        )
      }
    }
  }

  private getCompetenciesByLang(lang: Lang): SpecializationCompetenciesComponent {
    return (lang === Lang.UKR) ? this.competencies : this.competenciesEng;
  }

  private _createNewCompetencies(specializationId: number): void {
    const competencies: string = this.competencies.getValue();
    const competenciesEng: string = this.competenciesEng.getValue();
    if (competencies) {
      const acquiredCompetencies: AcquiredCompetencies = {
        competencies: competencies || '',
        competenciesEng: competenciesEng || '',
        specializationId
      } as AcquiredCompetencies;
      this._acquiredCompetenciesService.create(acquiredCompetencies);
    }
  }

  private _saveQualification(specializationId): void {
    this.qualification.save(specializationId);
  }


  onGuarantorSelect(param) {

  }
}
