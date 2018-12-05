import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Specialization } from '../../../models/Specialization';

@Component({
  selector: 'group-form',
  templateUrl: './group-form.component.html',
  styleUrls: [ './group-form.component.scss' ]
})
export class GroupFormComponent {

  form = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[A-zА-яІіЇї0-9-]*')
    ]),
    studySemesters: new FormControl(null, Validators.required),
    studyYears: new FormControl(null, [
      Validators.required,
      Validators.pattern('[0-9.]*')
    ]),
    beginYears: new FormControl(null, Validators.required),
    creationYear: new FormControl(null, Validators.required),
    tuitionForm: new FormControl(null, Validators.required),
    tuitionTerm: new FormControl(null, Validators.required),
    specialization: new FormControl(null, Validators.required)
  });

  @Input() tuitionForms;
  @Input() tuitionFormsKeys;
  @Input() tuitionTerms;
  @Input() tuitionTermsKeys;
  @Input() specializations: Specialization[];

  constructor() { }

  setValues(values) {
    this.form.controls.name.setValue(values['name']);
    this.form.controls.studySemesters.setValue(values['studySemesters']);
    this.form.controls.studyYears.setValue(values['studyYears']);
    this.form.controls.beginYears.setValue(values['beginYears']);
    this.form.controls.creationYear.setValue(values['creationYear']);
    this.form.controls.tuitionForm.setValue(values['tuitionForm']);
    this.form.controls.tuitionTerm.setValue(values['tuitionTerm']);
    this.form.controls.specialization.setValue(values['specialization']);
  }

}
