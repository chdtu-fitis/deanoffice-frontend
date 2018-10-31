import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {GroupModalComponent} from '../group-modal/group-modal.component'
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SpecializationService} from '../../../services/specialization.service';
import {Specialization} from '../../../models/Specialization';
import {TuitionForm} from '../../../models/tuition-form.enum';
import {TuitionTerm} from '../../../models/tuition-term.enum';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;

  form = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2)
    ]),
    studySemesters: new FormControl(null, Validators.required),
    studyYears: new FormControl(null, [Validators.required, Validators.pattern('[1-9.]*')]),
    beginYears: new FormControl(null, Validators.required),
    creationYear: new FormControl(null, Validators.required),
    tuitionForm: new FormControl(null, Validators.required),
    tuitionTerm: new FormControl(null, Validators.required),
    specialization: new FormControl(null, Validators.required),
  });

  tuitionForms;
  tuitionFormsKeys;

  tuitionTerms;
  tuitionTermsKeys;

  specializations: Specialization[];

  constructor(private groupService: GroupService, private specializationService: SpecializationService) {
    specializationService.getSpecializations(true).subscribe(
      (specializations: Specialization[]) => this.specializations = specializations,
      null,
      () => {
        this.specializations.sort((a, b) => a.id - b.id);
        this.form.controls['specialization'].setValue(this.specializations[0].id);
      }
    );
    this.tuitionFormsKeys = Object.keys(TuitionForm);
    this.tuitionForms = this.tuitionFormsKeys.map(key => TuitionForm[key]);
    this.tuitionTermsKeys = Object.keys(TuitionTerm);
    this.tuitionTerms = this.tuitionTermsKeys.map(key => TuitionTerm[key]);

    this.form.controls['studySemesters'].setValue(8);
    this.form.controls['studyYears'].setValue(3.84);
    this.form.controls['beginYears'].setValue(1);
    this.form.controls['creationYear'].setValue(this.getValueOfCreationYear());
    this.form.controls['tuitionForm'].setValue(this.tuitionFormsKeys[0]);
    this.form.controls['tuitionTerm'].setValue(this.tuitionTermsKeys[0]);
  }

  getValueOfCreationYear(): number {
    const year = (new Date()).getFullYear();
    const month = (new Date()).getUTCMonth() + 1;
    if (month > 6) {
      return year;
    } else {
      return year - 1;
    }
  }

  openModal(): void {
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(): void {
    const body = {
      name: this.form.value.name,
      active: false,
      studySemesters: this.form.value.studySemesters,
      creationYear: this.form.value.creationYear,
      specialization: {
        id: this.form.value.specialization
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
