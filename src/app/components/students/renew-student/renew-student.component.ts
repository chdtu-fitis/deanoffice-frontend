import {Component, EventEmitter, ViewChild, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap/modal';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentService} from '../../../services/student.service';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';
import {forObservable} from "../../shared/httpErrors";

@Component({
    selector: 'app-renew-student',
    templateUrl: './renew-student.component.html',
    styleUrls: ['./renew-student.component.scss'],
})
export class RenewStudentComponent extends BaseReactiveFormComponent implements IAppModal {
  student;
  groups: StudentGroup[];
  @ViewChild('modal', { static: false }) modal: ModalDirective;
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
      academicCertificateNumber: ['', Validators.required],
      academicCertificateDate: ['', Validators.required],
      academicCertificateIssuedBy: ['', Validators.required],
      studentExpelId: ['', Validators.required],
      studentGroupId: ['', Validators.required],
    });
    groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  openModal(expelledStudent) {
    this.student = expelledStudent.studentDegree.student;
    this.form.patchValue({ studentExpelId: expelledStudent.id });
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
    this.form.value.orderDate = new Date(this.form.value.orderDate);
    this.form.value.applicationDate = new Date(this.form.value.applicationDate);
    this.form.value.renewDate = new Date(this.form.value.renewDate);
    this.form.value.academicCertificateDate = new Date(this.form.value.academicCertificateDate);
    this.studentService.renewStudent(this.form.value).subscribe(
      () => {
        this.onSubmit.emit(this.form.value.studentExpelId);
        this.modal.hide();
      },
      (error) => {
        forObservable('Поновлення студента', [])(error);
      });
  }
}
