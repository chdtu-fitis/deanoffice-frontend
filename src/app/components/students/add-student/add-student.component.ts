import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import { ModalComponent } from '../../shared/modal/modal.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {StudentService} from '../../../services/student.service';

enum Tabs {
  New,
  Existing,
}

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.component.html',
    styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent extends ModalComponent {
  form: FormGroup;
  tabs = Tabs;
  activeTab: Tabs = Tabs.New;
  @Input() groups: StudentGroup[];

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    super();
    this.form = fb.group({
      student: '',
      studentGroupId: ['', Validators.required],
    });
    this.setStudentFormGroup();
  }

  selectTab(tab: Tabs) {
    this.activeTab = tab;
    this.form.reset();
    this.setStudentFormGroup();
  }

  onSubmit(e: Event) {
    this.validateAllFormFields(this.form);
    if (this.form.invalid) {
      return;
    }
    console.log('submitted', this.form.value);
  }

  hideModal() {
    super.hideModal();
    this.form.reset();
  }

  setStudentFormGroup() {
    const controls = this.activeTab === Tabs.New
      ? {
        name: ['', Validators.required],
        surname: ['', Validators.required],
        patronimic: ['', Validators.required],
        birthDate: ['', Validators.required],
      }
      : {
        id: ['', Validators.required],
        birthDate: ['', Validators.required],
      };
    this.form.setControl('student', this.fb.group(controls));
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
