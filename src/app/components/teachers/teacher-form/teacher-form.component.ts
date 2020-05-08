import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators,} from '@angular/forms';
import {Teacher} from '../../../models/Teacher';
import {TabsetComponent} from 'ngx-bootstrap';

import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {DepartmentService} from '../../../services/department.service';
import {PositionService} from '../../../services/position.service';
import {ScientificDegreeService} from '../../../services/scientific-degree.service';
import {Department} from '../../../models/Department';
import {Position} from '../../../models/Position';
import {ScientificDegree} from '../../../models/ScientificDegree';

const DEFAULT_STRING = '';

@Component({
  selector: 'teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent extends BaseReactiveFormComponent implements OnInit {
  @Input() updateForm = false;
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;
  @Input() initialData: Teacher = new Teacher();
  @Input() departments: Department[] = [];
  @Input() positions: Position[] = [];
  @Input() teacher: Teacher[];
  @Input() scientificDegrees: ScientificDegree[];

  constructor(
    private _formBuilder: FormBuilder,
    private _departmentService: DepartmentService,
    private _positionService: PositionService,
    private _scientificDegreeService: ScientificDegreeService) {
    super();
    this.setInitialData();
  }

  setInitialData(data: Teacher = new Teacher()) {
    this.initialData = data;
    this.form = this._formBuilder.group({
      name: [data.name,  Validators.required],
      surname: [data.surname, Validators.required],
      patronimic: [data.patronimic,  Validators.required],
      active: true,
      position: data.position,
      department: data.department,
      id: data.id,
      sex: [data.sex, Validators.required],
      scientificDegreeId: [data.scientificDegreeId, Validators.required],
      positionId: [data.positionId, Validators.required],
      departmentId: [data.departmentId, Validators.required],
      academicTitle: [data.academicTitle, Validators.required]
    });
  }

  ngOnInit() {
    this._departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
    this._positionService.getPositions()
      .subscribe((positions: Position[]) => this.positions = positions);
    this._scientificDegreeService.getScientificDegrees()
      .subscribe((scientificDegrees: ScientificDegree[]) => this.scientificDegrees = scientificDegrees);
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
      active: true,
      id: s.id,
      surname: s.surname || DEFAULT_STRING,
      patronimic: s.patronimic || DEFAULT_STRING,
      sex: s.sex || DEFAULT_STRING,
      scientificDegreeId: s.scientificDegreeId,
      position: s.position || null,
      department: s.department || null,
      departmentId: s.departmentId,
      positionId: s.positionId,
      academicTitle: s.academicTitle || DEFAULT_STRING
    } as Teacher;
  }

  reset() {
  }
}
