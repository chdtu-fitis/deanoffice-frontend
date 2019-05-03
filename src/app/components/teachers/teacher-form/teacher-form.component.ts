import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators,} from '@angular/forms';
import {Teacher} from '../../../models/Teacher';

import {TabsetComponent} from 'ngx-bootstrap';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {DepartmentService} from '../../../services/department.service';
import {PositionService} from '../../../services/position.service';
import {Department} from '../../../models/Department';
import {Position} from  '../../../models/Position';

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
  @Input() initialData: Teacher = new Teacher();
  @Input() departments: Department[] = [];
  @Input() positions: Position[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _departmentService: DepartmentService,
    private _positionService: PositionService) {
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
      scientificDegree: data.scientificDegree,
      positionId: [data.positionId, Validators.required],
      departmentId: [data.departmentId, Validators.required],

    });
  }

  ngOnInit() {
    this._departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
    this._positionService.getPositions()
      .subscribe((positions: Position[]) => this.positions = positions);
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
  
  reset() {
  }
}
