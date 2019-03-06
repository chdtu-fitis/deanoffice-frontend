import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

import {Specialization} from '../../../models/Specialization';
import {SpecializationService} from '../../../services/specialization.service';
import {StudentDegree} from '../../../models/StudentDegree';
import {GroupService} from '../../../services/group.service';
import {StudentGroup} from '../../../models/StudentGroup';
import {Payment} from '../../../models/payment.enum';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'student-specialization-transfer',
  templateUrl: './student-specialization-transfer.component.html',
  styleUrls: ['./student-specialization-transfer.component.scss']
})
export class StudentSpecializationTransferComponent {
  form: FormGroup;
  years: Array<number>;
  studentDegree: StudentDegree;
  specializations: Specialization[];
  groups: StudentGroup[] = [];
  paymentType = Payment;
  paymentKey: Array<string>;
  @ViewChild('modal') modal: ModalDirective;
  @Output() onSubmit = new EventEmitter();

  constructor(
    private specializationService: SpecializationService,
    private studentService: StudentService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {
    this.paymentKey = Object.keys(Payment);
    this.years = [1, 2, 3, 4, 5, 6];
    this.form = this.fb.group({
      orderDate: ['', Validators.required],
      orderNumber: ['', Validators.required],
      newStudyYear: ['', Validators.required],
      newSpecializationId: ['', Validators.required],
      newPayment: ['', Validators.required],
      applicationDate: ['', Validators.required],
      contractNumber: '',
      contractDate: '',
      studentDegreeId: ['', Validators.required],
      newStudentGroupId: ['', Validators.required],
    });
  }

  openModal(student) {
    this.studentDegree = student;
    this.specializationService.getSpecializations(true).subscribe((specializations: Specialization[]) =>
      this.specializations = specializations
    );
    this.form.controls.studentDegreeId.setValue(this.studentDegree.id);
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  submit() {
    this.studentService.createStudentTransfer(this.form.value).subscribe(() => {
      const specialization = this.specializations.find(
        specialization => specialization.id === Number(this.form.controls.newSpecializationId.value));
      const group = this.groups.find(group => group.id === Number(this.form.controls.newStudentGroupId.value));
      const transferData = {group, specialityCode: specialization.speciality.code, ...this.form.value};
      this.onSubmit.emit(transferData);
      this.hideModal();
    });
  }

  onSpecializationChange(event) {
    this.groupService.getGroupsBySpecialization(event.target.value).subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }
}

