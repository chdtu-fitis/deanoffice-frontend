import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Teacher} from '../../../models/Teacher';
import {Observable} from 'rxjs/Observable';
import {TabsetComponent} from 'ngx-bootstrap';

import {flatMap} from 'rxjs/operators';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {Specialization} from '../../../models/Specialization';
import {Lang} from '../../specialization/specialization-form/enums/lang.enum';
import {DegreeService} from '../../../services/degree.service';
import {SpecialityService} from '../../../services/speciality.service';
import {DepartmentService} from '../../../services/department.service';
import {AcquiredCompetenciesService} from '../../specialization/specialization-form/services/acquired-competencies.service';
import {Degree} from '../../../models/Degree';
import {Department} from '../../../models/Department';
import {SpecializationCompetenciesComponent} from '../../specialization/specialization-form/specialization-competencies/specialization-competencies.component';
import {AcquiredCompetencies} from '../../specialization/specialization-form/models/acquired-competencies';

const DEFAULT_NUMBER = 0;
const DEFAULT_STRING = '';
const DEFAULT_BOOLEAN = true;

@Component({
  selector: 'teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent extends BaseReactiveFormComponent implements OnInit {
  @Input() updateForm = false;
  @ViewChild('tabset') tabset: TabsetComponent;
   initialData: Teacher = new Teacher();
  isShow = true;
  lang = Lang;
  departments: Department[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _departmentService: DepartmentService,) {
    super();
    this.setInitialData();
  }

  setInitialData(data: Teacher = new Teacher()) {
    this.initialData = data;
    this.form = this._formBuilder.group({
      name: data.name,
      surname: data.surname,
      patronimic: data.patronimic,
      active: data.active,
      sex: data.sex,
      position: data.position,
      scientificDegree: data.scientificDegree,
      department: data.department,

    });
  }

  ngOnInit() {
    this._departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
  }
  invalid(): boolean {
    super.submit();
    if (this.form.invalid) {
      alert('Перевірте введені дані на правильність!');
    }
    return this.form.invalid;
  }

  getValue(): Teacher {
    const s: Teacher = this.form.getRawValue() as Teacher;
    return {
      ...s,
      name: s.name || DEFAULT_STRING,
      active: s.active || DEFAULT_BOOLEAN,
      surname: s.surname || DEFAULT_STRING,
      patronimic: s.patronimic || DEFAULT_STRING,
      sex: s.sex || DEFAULT_STRING,
      position: s.position || DEFAULT_STRING,
      scientificDegree: s.scientificDegree || DEFAULT_STRING,
      department: s.department || DEFAULT_STRING,
    } as Teacher;
  }

  selectTap(tabIndex: number): void {
    this.tabset.tabs[tabIndex].active = true;
  }

  reset() {
  }
}
