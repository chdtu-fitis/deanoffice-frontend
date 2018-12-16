import { Component, EventEmitter, ViewChild, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';

import { IAppModal } from '../../shared/modal.interface';
import { BaseReactiveFormComponent } from '../../shared/base-reactive-form/base-reactive-form.component';
import { StudentService } from '../../../services/student.service';
import { StudentDegree } from '../../../models/StudentDegree';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-student-expel',
  templateUrl: './student-expel.component.html',
  styleUrls: [ './student-expel.component.scss' ]
})
export class StudentExpelComponent extends BaseReactiveFormComponent implements IAppModal {
  students;
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
      orderNumber: [
        '', Validators.required
      ],
      orderDate: [
        '', Validators.required
      ],
      applicationDate: [
        '', Validators.required
      ],
      expelDate: [
        '', Validators.required
      ],
      orderReasonId: [
        '', Validators.required
      ],
      studentDegreeIds: this.fb.array([])
    });
    generalService.getStudentExpelReasons().subscribe(reasons => this.reasons = reasons);
  }

  openModal(degrees: StudentDegree[]) {
    this.students = degrees.map(degree => ({
      ...degree.student,
      id: degree.id,
      groups:
      degree.studentGroup.name
    }));
    this.form.setControl('studentDegreeIds', this.fb.array(degrees.map(degree => degree.id)));
    this.modal.show();
  }

  onRemoveStudent(id) {
    this.students = this.students.filter(student => student.id !== id);
    const ids = this.students.map(item => item.id);
    this.form.setControl('studentDegreeIds', this.fb.array(ids));
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
    this.studentService.expelStudents(this.form.value).subscribe((): void => {
      this.onSubmit.emit(this.form.value.studentDegreeIds);
      this.modal.hide();
    });
  }
}
