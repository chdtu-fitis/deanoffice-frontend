import {Component, Input, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ModalDirective} from 'ngx-bootstrap';

import {StudentGroup} from '../../../models/StudentGroup';
import {StudentService} from '../../../services/student.service';
import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';

enum Tabs {
  New,
  Existing,
}

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent extends BaseReactiveFormComponent implements IAppModal {
  tabs = Tabs;
  activeTab: Tabs = Tabs.Existing;
  @Input() groups: StudentGroup[];
  @ViewChild('modal') modal: ModalDirective;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    super();
    this.form = fb.group({
      student: '',
      studentGroupId: ['', Validators.required],
      payment: ['', Validators.required],
    });
    this.setStudentFormGroup();
  }

  selectTab(tab: Tabs) {
    this.activeTab = tab;
    this.form.reset();
    this.setStudentFormGroup();
  }

  submit() {
    super.onSubmit();
    console.log('submitted', this.form.value);
    // this.studentService.addStudent(this.form.value);
  }

  hideModal() {
    this.modal.hide();
    this.form.reset();
  }

  setStudentFormGroup() {
    const controls = this.activeTab === Tabs.New
      ? {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        patronimic: ['', Validators.required],
        birthDate: ['', Validators.required],
        sex: ['', Validators.required],
      }
      : {
        id: ['', Validators.required],
        birthDate: ['', Validators.required],
        sex: ['', Validators.required],
      };
    this.form.setControl('student', this.fb.group(controls));
  }

  onSelectStudent(student) {
    this.form.patchValue({
      student: { birthDate: student.birthDate },
    });
  }
}
