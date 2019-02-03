import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {ModalDirective} from 'ngx-bootstrap';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {IAppModal} from '../../shared/modal.interface';
import {BaseReactiveFormComponent} from '../../shared/base-reactive-form/base-reactive-form.component';
import {StudentService} from '../../../services/student.service';
import {StudentDegree} from '../../../models/StudentDegree';
import {StudentGroup} from '../../../models/StudentGroup';
import {DiplomaType} from '../../../models/diploma-type.enum';
import {StudentPreviousUniversity} from '../../../models/StudentPreviousUniversity';

@Component({
    selector: 'app-student-degree-info',
    templateUrl: './student-degree-info.component.html',
    styleUrls: ['./student-degree-info.component.scss'],
})
export class StudentDegreeInfoComponent extends BaseReactiveFormComponent implements IAppModal {
  form: FormGroup;
  studentPreviousUniversity: FormGroup;
  model: StudentDegree;
  diplomaType = DiplomaType;
  diplomaTypeKey: Array<string>;
  tabValidity: Array<boolean> = [];
  @ViewChild('modal') modal: ModalDirective;
  @Output() onSubmit = new EventEmitter();
  @Input() groups: StudentGroup[];

  get degrees() {
    return this.form.get('degrees') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer) {
    super();
    this.diplomaTypeKey = Object.keys(DiplomaType);
    iconRegistry.addSvgIcon(
      'cancel',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/baseline-cancel-24px.svg'));
  }

  selectGroup(group) {
    this.form.value['degrees'][0]['studentGroup'] = group;
  }

  openModal(id) {
    this.studentService.getDegreesByStudentId(id).subscribe((studentDegrees: StudentDegree) => {
      this.model = studentDegrees;
      this.model['degrees'].sort( (a, b) => b.active - a.active );
      this.buildForm();
      this.modal.show();
    });
  }

  buildForm() {
    this.form = this.fb.group({
      degrees: this.fb.array((this.model['degrees'] as StudentDegree[]).map((degree: StudentDegree) => {
        return this.fb.group({
          id: degree.id,
          studentGroupId: [
            {
              value: degree.studentGroup ? degree.studentGroup.id : null,
              disabled: !degree.active
            },
            degree.active ? Validators.required : null,
          ],
          recordBookNumber: degree.recordBookNumber,
          studentCardNumber: degree.studentCardNumber,
          diplomaNumber: degree.diplomaNumber,
          diplomaDate: degree.diplomaDate,
          diplomaWithHonours: degree.diplomaWithHonours,
          supplementNumber: degree.supplementNumber,
          supplementDate: degree.supplementDate,
          thesisName: degree.thesisName,
          thesisNameEng: degree.thesisNameEng,
          protocolNumber: degree.protocolNumber,
          protocolDate: degree.protocolDate,
          previousDiplomaType: degree.previousDiplomaType,
          previousDiplomaNumber: degree.previousDiplomaNumber,
          previousDiplomaDate: degree.previousDiplomaDate,
          previousDiplomaIssuedBy: degree.previousDiplomaIssuedBy,
          previousDiplomaIssuedByEng: degree.previousDiplomaIssuedByEng,
          admissionOrderDate: degree.admissionOrderDate,
          admissionOrderNumber: degree.admissionOrderNumber,
          contractDate: degree.contractDate,
          contractNumber: degree.contractNumber,
          admissionDate: degree.admissionDate,
          studentPreviousUniversities: this.fb.array(degree.studentPreviousUniversities.map((SPU) => {
            return this.fb.group({
              id: SPU.id,
              universityName: SPU.universityName,
              studyStartDate: SPU.studyStartDate,
              studyEndDate: SPU.studyEndDate,
              academicCertificateNumber: SPU.academicCertificateNumber,
              academicCertificateDate: SPU.academicCertificateDate,
            })
          })),
          payment: degree.payment,
          active: degree.active
        })
      }))
    });
    this.form.controls.degrees['controls'].map(control => {
      if (!control.controls.active.value) {
        control.disable()
      }}
    );
  }

  getTabHeader(i: number) {
    const specialization = (this.model as any).degrees[i].specialization;
    const specialityAbbr = specialization.speciality.name
      .split(' ')
      .map(str => str.charAt(0))
      .join('')
      .toUpperCase();
    return `${specialityAbbr} ${specialization.degree.name}`;
  }

  addStudentPreviousUniversity() {
    this.studentPreviousUniversity = this.fb.group({...new StudentPreviousUniversity()});
    this.degrees.controls[0]['controls']['studentPreviousUniversities'].push(this.studentPreviousUniversity);
  }

  deleteStudentPreviousUniversity(id) {
    const studentPreviousUniversities = this.degrees.controls[0]['controls']['studentPreviousUniversities'];
    const index = studentPreviousUniversities.value.findIndex(i => i.id === id);
    studentPreviousUniversities.controls.splice(index, 1);
    studentPreviousUniversities.value.splice(index, 1);
  }

  submit() {
    super.submit();
    if (this.form.invalid) {
      this.tabValidity = this.degrees.controls.map(
        control => control.invalid
      );
      return;
    }
    const degrees = this.form.value.degrees.filter(degree => degree.active);
    this.studentService.updateStudentDegreesByStudentId(this.model.id, degrees).subscribe(() => {
      this.onSubmit.emit(this.form.value);
      this.modal.hide();
    });
  }
}
