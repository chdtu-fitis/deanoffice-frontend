import {of, Observable} from 'rxjs';
import {map, flatMap} from 'rxjs/operators';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Department} from '../../../models/Department';
import {Degree} from '../../../models/Degree';
import {Speciality} from '../../../models/Speciality';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DegreeService} from '../../../services/degree.service';
import {SpecialityService} from '../../../services/speciality.service';
import {DepartmentService} from '../../../services/department.service';
import {Specialization} from '../../../models/Specialization';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {TypeaheadMatch} from 'ngx-bootstrap/typeahead';
import {SpecializationCompetenciesComponent} from './specialization-competencies/specialization-competencies.component';
import {AcquiredCompetencies} from './models/acquired-competencies';
import {AcquiredCompetenciesService} from './services/acquired-competencies.service';
import {Lang} from './enums/lang.enum';
import {SpecializationQualificationComponent} from './specialization-qualification/specialization-qualification.component';
import {TeacherService} from "../../../services/teacher.service";
import {Teacher} from "../../../models/Teacher";
import {AcademicTitleValues} from "../../../models/AcademicTitleValues";
import {BaseEntity} from "../../../models/basemodels/BaseEntity";

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
  currentProgramHead: Teacher;
  AcademicTitleValues = AcademicTitleValues;

  constructor(
    private _formBuilder: FormBuilder,
    private _degreeService: DegreeService,
    private _specialityService: SpecialityService,
    private _departmentService: DepartmentService,
    private _acquiredCompetenciesService: AcquiredCompetenciesService,
    private _teacherService: TeacherService
  ) {
    super();
  }

  ngOnInit() {
    this.setInitialData();
    this.createTeachersDataSource();
    this._degreeService.getDegrees().subscribe((degrees: Degree[]) => this.degrees = degrees);
    this.setSpecialityToAllActiveInFaculty();
    this._departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
  }

  // TODO Return validation for name (only ukr), programHead, certificate
  setInitialData(data: Specialization = new Specialization()) {
    this.initialData = data;
    this.form = this._formBuilder.group({
      name: [data.name, Validators.required],
      nameEng: data.nameEng,
      code: data.code,
      specializationName: data.specializationName,
      specializationNameEng: data.specializationNameEng,
      programHead: this._formBuilder.group({
        id: data.programHead ? data.programHead.id : '',
        fullName: data.programHead ? `${data.programHead.surname} ${data.programHead.name} ${data.programHead.patronimic}` : ''
      }),
      specialityId: [data.speciality ? data.speciality.id : 0, Validators.required],
      degreeId: [data.degree ? data.degree.id : 0, Validators.required],
      departmentId: [data.department ? data.department.id : 0, Validators.required],
      certificateIssuedBy: data.certificateIssuedBy,
      certificateIssuedByEng: data.certificateIssuedByEng,
      certificateNumber: data.certificateNumber,
      certificateDate: data.certificateDate,
      normativeCreditsNumber: [data.normativeCreditsNumber, Validators.required],
      normativeTermOfStudy: [data.normativeTermOfStudy, Validators.required],
    });
    this.currentProgramHead = data.programHead;
  }

  createTeachersDataSource() {
    this.teachersDataSource = Observable.create((observer: any) => {
      let guarantorInputValue = (this.form.controls.programHead as FormGroup).controls.fullName.value;
      if (guarantorInputValue.length < 3) {
        return;
      }

      // clear the selected value if input value was changed after selection
      let guarantorIdControl = (this.form.controls.programHead as FormGroup).controls.id;
      if (guarantorIdControl.value) {
        guarantorIdControl.setValue(null);
        this.currentProgramHead = null;
      }
      this._teacherService.getTeachersBySurnamePart(guarantorInputValue).subscribe((result: any) => {
        observer.next(result);
      });
    });
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
    (this.form.controls.programHead as FormGroup).removeControl("fullName");
    const s: Specialization = this.form.getRawValue() as Specialization;
    return {
      ...s,
      id: this.initialData.id,
      name: s.name || DEFAULT_STRING,
      active: this.initialData.active,
      speciality: new BaseEntity(s.specialityId),
      degree: new BaseEntity(s.degreeId),
      department: new BaseEntity(s.departmentId),
      certificateIssuedBy: s.certificateIssuedBy || DEFAULT_STRING,
      certificateIssuedByEng: s.certificateIssuedByEng || DEFAULT_STRING,
      certificateNumber: s.certificateNumber || DEFAULT_STRING,
      certificateDate: s.certificateDate || DEFAULT_DATE,
      programHead: s.programHead.id ? s.programHead : null,
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

  onProgramHeadSelect(event: TypeaheadMatch): void {
    this.currentProgramHead = event.item as Teacher;
    const programHeadFormGroup = this.form.controls.programHead as FormGroup;
    programHeadFormGroup.controls.fullName.setValue(`${this.currentProgramHead.surname} ${this.currentProgramHead.name} ${this.currentProgramHead.patronimic}`);
    programHeadFormGroup.controls.id.setValue(this.currentProgramHead.id);
  }
}
