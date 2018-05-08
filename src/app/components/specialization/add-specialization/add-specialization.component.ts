import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {DegreeService} from '../../../services/degree.service';
import {Degree} from '../../../models/Degree';
import {Speciality} from '../../../models/Speciality';
import {SpecialityService} from '../../../services/speciality.service';
import {DepartmentService} from '../../../services/department.service';
import {Department} from '../../../models/Department';

@Component({
  selector: 'add-specialization',
  templateUrl: './add-specialization.component.html',
  styleUrls: ['./add-specialization.component.scss']
})
export class AddSpecializationComponent extends BaseReactiveFormComponent implements IAppModal, OnInit {
  @ViewChild('modal') modal: ModalDirective;
  degrees: Degree[] = [];
  specialities: Speciality[] = [];
  departments: Department[] = [];

  constructor(
    formBuilder: FormBuilder,
    private degreeService: DegreeService,
    private specialityService: SpecialityService,
    private departmentService: DepartmentService
  ) {
    super();
    this.form = formBuilder.group({
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
      knowledgeAndUnderstandingOutcomes:  '',
      knowledgeAndUnderstandingOutcomesEng:  '',
      applyingKnowledgeAndUnderstandingOutcomes:  '',
      applyingKnowledgeAndUnderstandingOutcomesEng:  '',
      makingJudgementsOutcomes:  '',
      makingJudgementsOutcomesEng: ''
    });
  }

  ngOnInit() {
    this.degreeService.getDegrees().subscribe((degrees: Degree[]) => this.degrees = degrees);
    this.specialityService.getSpecialities()
      .subscribe((specialities: Speciality[]) => this.specialities = specialities);
    this.departmentService.getDepartments()
      .subscribe((departments: Department[]) => this.departments = departments);
  }

  openModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }
}
