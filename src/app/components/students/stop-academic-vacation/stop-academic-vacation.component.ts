import {Component, EventEmitter, ViewChild, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentService} from '../../../services/student.service';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';

@Component({
    selector: 'app-stop-academic-vacation',
    templateUrl: './stop-academic-vacation.component.html',
    styleUrls: ['./stop-academic-vacation.component.scss'],
})
export class StopAcademicVacationComponent extends BaseReactiveFormComponent implements IAppModal {
  student;
  groups: StudentGroup[];
  @ViewChild('modal') modal: ModalDirective;
  @Output() onSubmit = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private groupService: GroupService,
  ) {
    super();
    this.form = this.fb.group({
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      payment: ['', Validators.required],
      renewDate: ['', Validators.required],
      applicationDate: ['', Validators.required],
      studentAcademicVacationId: ['', Validators.required],
      studentGroupId: ['', Validators.required],
    });
    groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  openModal(studentInVacation) {
    this.student = studentInVacation.studentDegree.student;
    this.form.patchValue({ studentAcademicVacationId: studentInVacation.id });
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
    this.studentService.stopAcademicVacation(this.form.value).subscribe(() => {
      this.onSubmit.emit(this.form.value.studentAcademicVacationId);
      this.modal.hide();
    });
  }
}
