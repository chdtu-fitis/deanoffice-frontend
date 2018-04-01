import {Component, EventEmitter, Input, ViewChild, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentService} from '../../../services/student.service';
import {StudentDegree} from '../../../models/StudentDegree';

@Component({
    selector: 'app-student-expel',
    templateUrl: './student-expel.component.html',
    styleUrls: ['./student-expel.component.scss'],
})
export class StudentExpelComponent extends BaseReactiveFormComponent implements IAppModal {
  students;
  @ViewChild('modal') modal: ModalDirective;

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    super();
    this.form = this.fb.group({
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      applicationDate: ['', Validators.required],
      expelDate: ['', Validators.required],
      // reasonId: ['', Validators.required],
    });
  }

  openModal(degrees: StudentDegree[]) {
    this.students = degrees.map(degree => ({
      ...degree.student,
      id: degree.id, groups:
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

  submit() {
    // const studentDegreeIds = this.students.map(degree => degree.id);
    console.log(this.form.value);
  }
}
