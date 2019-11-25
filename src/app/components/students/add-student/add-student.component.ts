import {Component, EventEmitter, Input, ViewChild, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDirective, TabsetComponent} from 'ngx-bootstrap';

import {StudentGroup} from '../../../models/StudentGroup';
import {StudentService} from '../../../services/student.service';
import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentDegree} from '../../../models/StudentDegree';

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
  @Output() onSubmit = new EventEmitter<StudentDegree>();
  @ViewChild('modal', { static: false }) modal: ModalDirective;
  @ViewChild('tabset', { static: false }) tabset: TabsetComponent;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService
  ) {
    super();
    this.form = fb.group({
      id: '',
      student: '',
      studentGroupId: ['', Validators.required],
      payment: ['', Validators.required],
    });
    this.setStudentFormGroup();
  }

  get student() {
    return this.form.controls['student'] as FormGroup;
  }

  selectTab(tab: Tabs) {
    if (this.activeTab === tab) {
      return;
    }

    this.activeTab = tab;
    this.form.reset();
    this.setStudentFormGroup();
  }

  submit() {
    super.submit();
    if (this.form.invalid) {
      return;
    }
    this.studentService.addStudentDegree(this.form.value)
      .subscribe((student: StudentDegree) => {
        this.onSubmit.emit(student);
        this.hideModal();
      });
  }

  hideModal() {
    this.modal.hide();
    this.form.reset();
    this.activeTab = Tabs.Existing;
    this.tabset.tabs[0].active = true;
  }

  setStudentFormGroup() {
    const controls = this.activeTab === Tabs.New
      ? {
        id: '',
        name: ['', Validators.required],
        surname: ['', Validators.required],
        patronimic: ['', Validators.required],
        birthDate: ['', Validators.required],
        sex: ['', Validators.required],
      }
      : {
        id: ['', Validators.required],
        birthDate: ['', Validators.required],
      };
    this.form.setControl('student', this.fb.group(controls));
  }

  onSelectStudent({ birthDate }) {
    this.form.patchValue({
      student: { birthDate },
    });
  }
}
