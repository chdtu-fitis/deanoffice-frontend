import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentService} from '../../../services/student.service';
import {StudentDegree} from '../../../models/StudentDegree';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
    selector: 'app-student-degree-info',
    templateUrl: './student-degree-info.component.html',
    styleUrls: ['./student-degree-info.component.scss'],
})
export class StudentDegreeInfoComponent extends BaseReactiveFormComponent implements IAppModal {
  form: FormGroup;
  model: any[];
  id: string;
  @ViewChild('modal') modal: ModalDirective;
  @Output() onSubmit = new EventEmitter();
  @Input() groups: StudentGroup[];

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    super();
  }

  openModal(id) {
    this.studentService.getDegreesByStudentId(id).subscribe((studentDegrees) => {
      this.model = studentDegrees;
      console.log(this.model);
      this.buildForm();
      this.modal.show();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      degrees: this.fb.array((this.model['degrees'] as StudentDegree[]).map((degree: StudentDegree) =>
        this.fb.group({
          studentGroup: ['', Validators.required],
          recordBookNumber: [degree.recordBookNumber],
          diplomaNumber: [degree.diplomaNumber],
          diplomaDate: [degree.diplomaDate],
          supplementNumber: [degree.supplementNumber],
          supplementDate: [degree.supplementDate],
          thesisName: [degree.thesisName],
          thesisNameEng: [degree.thesisNameEng],
          protocolNumber: [degree.protocolNumber],
          protocolDate: [degree.protocolDate],
          previousDiplomaType: [degree.previousDiplomaType],
          previousDiplomaNumber: [degree.previousDiplomaNumber],
          previousDiplomaDate: [degree.previousDiplomaDate],
          payment: [degree.payment],
        })
      ))
    });
  }

  submit() {
    super.submit();
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
