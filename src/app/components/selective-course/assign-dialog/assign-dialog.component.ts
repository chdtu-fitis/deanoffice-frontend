import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../models/Department';
import {Observable} from 'rxjs';

@Component({
  selector: 'assign-dialog',
  templateUrl: './assign-dialog.component.html',
  styleUrls: ['./assign-dialog.component.scss']
})
export class AssignDialogComponent implements OnInit {
  form: FormGroup;
  selectedPrepType: any;
  selectedCourses = [];
  semester: number;

  knowledgeTypes: string[] = [
    '02 Культура і мистецтво',
    '03 Гуманітарні науки',
    '05 Соціальні та поведінкові науки',
    '07 Управління та адміністрування',
    '10 Природничі науки',
    '12 Інформаційні технології',
    '13 Механічна інженерія',
    '14 Електрична інженерія',
    '15 Автоматизація та приладобудування',
    '16 Хімічна та біоінженерія',
    '17 Електроніка та телекомунікації',
    '18 Виробництво та технології',
    '19 Архітектура та будівництво',
    '23 Соціальна робота',
    '24 Сфера обслуговування',
    '27 Транспорт',
    '28 Публічне управління та адміністрування',
  ];

  departments$: Observable<Department[]>;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef,
              private departmentService: DepartmentService) {
    this.form = fb.group({
      knowledgeTypes: fb.array([]),
    });
    for (let type of this.knowledgeTypes) {
      (<FormArray>this.form.get('knowledgeTypes')).push(new FormControl(false));
    }
  }

  ngOnInit() {
    this.departments$ = this.departmentService.getDepartments();
    this.departments$.subscribe(departments => {
      console.log(departments);
    });
  }

  assign() {
    const a = this.form.get('knowledgeTypes').get('0').value;
    console.log(a);
  }
}
