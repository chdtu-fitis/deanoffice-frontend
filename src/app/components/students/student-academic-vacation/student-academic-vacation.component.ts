import {Component, EventEmitter, ViewChild, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentService} from '../../../services/student.service';
import {GeneralService} from '../../../services/general.service';

@Component({
    selector: 'app-student-academic-vacation',
    templateUrl: './student-academic-vacation.component.html',
    styleUrls: ['./student-academic-vacation.component.scss'],
})
export class StudentAcademicVacationComponent extends BaseReactiveFormComponent implements IAppModal {
  students;
  id;
  reasons;
  @ViewChild('modal') modal: ModalDirective;
  @Output() onSubmit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private generalService: GeneralService
  ) {
    super();
    this.form = this.fb.group({
      vacationStartDate: ['', Validators.required],
      vacationEndDate: ['', Validators.required],
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      applicationDate: ['', Validators.required],
      orderReasonId: ['', Validators.required],
      studentDegreeId: ['', Validators.required],
      extraInformation: '',
    });
    generalService.getAcademicVacationReasons().subscribe(reasons => this.reasons = reasons);
  }

  openModal(studentDegreeId) {
    this.form.patchValue({ studentDegreeId });
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
    this.form.reset();
  }

  submit() {
    super.submit();
    if (this.form.invalid) {
      return;
    }
    this.studentService.startAcademicVacation(this.form.value).subscribe(() => {
      this.onSubmit.emit(this.form.value.studentDegreeId);
      this.hideModal();
    });
  }
}
