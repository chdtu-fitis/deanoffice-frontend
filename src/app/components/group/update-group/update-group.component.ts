import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {GroupModalComponent} from '../group-modal/group-modal.component';
import {SpecializationService} from '../../../services/specialization.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../services/group.service';
import {Specialization} from '../../../models/Specialization';
import {StudentGroup} from '../../../models/StudentGroup';
import {TuitionForm} from '../../../models/tuition-form.enum';
import {TuitionTerm} from '../../../models/tuition-term.enum';

@Component({
  selector: 'update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;

  selectedGroup: StudentGroup;

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

  tuitionFormsKeys;
  tuitionForms;

  tuitionTermsKeys;
  tuitionTerms;

  specializations: Specialization[];

  constructor(private groupService: GroupService, private specializationService: SpecializationService) { }

  ngOnInit () {
    this.specializationService.getSpecializations(true).subscribe(
      (specializations: Specialization[]) => this.specializations = specializations,
      null,
      () => this.specializations.sort((a, b) => a.id - b.id)
    );
  }

  openModal(selectedGroup): void {

    this.tuitionFormsKeys = Object.keys(TuitionForm);
    this.tuitionForms = this.tuitionFormsKeys.map(key => TuitionForm[key]);
    this.tuitionTermsKeys = Object.keys(TuitionTerm);
    this.tuitionTerms = this.tuitionTermsKeys.map(key => TuitionTerm[key]);

    this.selectedGroup = selectedGroup;
    this.form.controls['name'].setValue(selectedGroup.name);
    this.form.controls['studySemesters'].setValue(selectedGroup.studySemesters);
    this.form.controls['studyYears'].setValue(selectedGroup.studyYears);
    this.form.controls['beginYears'].setValue(selectedGroup.beginYears);
    this.form.controls['creationYear'].setValue(selectedGroup.creationYear);
    this.form.controls['tuitionForm'].setValue(selectedGroup.tuitionForm);
    this.form.controls['tuitionTerm'].setValue(selectedGroup.tuitionTerm);
    this.form.controls['specialization'].setValue(selectedGroup.specialization.id);

    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(): void {
    const body = {
      id: this.selectedGroup.id,
      name: this.form.value.name,
      active: this.selectedGroup.active,
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
    this.groupService.update(body)
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }

}
