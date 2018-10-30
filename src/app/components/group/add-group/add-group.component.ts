import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {GroupModalComponent} from '../group-modal/group-modal.component'

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SpecializationService} from '../../../services/specialization.service';
import {Specialization} from '../../../models/Specialization';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    studySemesters: new FormControl(8, Validators.required),
    studyYears: new FormControl(4, Validators.required),
    beginYears: new FormControl(1, Validators.required),
    creationYear: new FormControl(this.getValueOfCreationYear(), Validators.required),
    tuitionForm: new FormControl(0, Validators.required),
    tuitionTerm: new FormControl(0, Validators.required),
    specialization: new FormControl(0, Validators.required),
  });

  tuitionForms = [
    'FULL_TIME',
    'EXTRAMURAL',
  ];

  tuitionTerms = [
    'REGULAR',
    'SHORTENED',
  ];

  specializations: Specialization[];

  constructor(private groupService: GroupService, private specializationService: SpecializationService) {
    specializationService.getSpecializations(true).subscribe(
      (specializations: Specialization[]) => this.specializations = specializations,
      null,
      () => this.specializations.sort((a, b) => a.id - b.id)
    );
  }

  getValueOfCreationYear(): number {
    const year = (new Date()).getFullYear();
    const month = (new Date()).getUTCMonth() + 1;
    if (month > 6) {
      return year - 1;
    } else {
      return year - 2;
    }
  }

  openModal(): void {
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(): void {
    if (this.form.value.name === '') {
      return;
    }

    const body = {
      name: this.form.value.name,
      active: false,
      studySemesters: this.form.value.studySemesters,
      creationYear: this.form.value.creationYear,
      specialization: {
        id: this.specializations[this.form.value.specialization].id
      },
      tuitionForm: this.form.value.tuitionForm,
      tuitionTerm: this.form.value.tuitionTerm,
      studyYears: this.form.value.studyYears,
      beginYears: this.form.value.beginYears
    };
    this.groupService.create(body)
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }
}
