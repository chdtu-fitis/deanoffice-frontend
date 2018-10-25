import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
  model: StudentDegree;
  diplomaType = DiplomaType;
  diplomaTypeKey: Array<string>;
  tabValidity: Array<boolean> = [];
  @ViewChild('modal') modal: ModalDirective;
  @Output() onSubmit = new EventEmitter();
  @Input() groups: StudentGroup[];

  constructor(private fb: FormBuilder, private studentService: StudentService) {
    super();
    this.diplomaTypeKey = Object.keys(DiplomaType);
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
          recordBookNumber: this.getFormField(degree, 'recordBookNumber'),
          studentCardNumber: this.getFormField(degree, 'studentCardNumber'),
          diplomaNumber: this.getFormField(degree, 'diplomaNumber'),
          diplomaDate: this.getFormField(degree, 'diplomaDate'),
          diplomaWithHonours: this.getFormField(degree, 'diplomaWithHonours'),
          supplementNumber: this.getFormField(degree, 'supplementNumber'),
          supplementDate: this.getFormField(degree, 'supplementDate'),
          thesisName: this.getFormField(degree, 'thesisName'),
          thesisNameEng: this.getFormField(degree, 'thesisNameEng'),
          protocolNumber: this.getFormField(degree, 'protocolNumber'),
          protocolDate: this.getFormField(degree, 'protocolDate'),
          previousDiplomaType: this.getFormField(degree, 'previousDiplomaType'),
          previousDiplomaNumber: this.getFormField(degree, 'previousDiplomaNumber'),
          previousDiplomaDate: this.getFormField(degree, 'previousDiplomaDate'),
          previousDiplomaIssuedBy: this.getFormField(degree, 'previousDiplomaIssuedBy'),
          previousDiplomaIssuedByEng: this.getFormField(degree, 'previousDiplomaIssuedByEng'),
          admissionOrderDate: this.getFormField(degree, 'admissionOrderDate'),
          admissionOrderNumber: this.getFormField(degree, 'admissionOrderNumber'),
          contractDate: this.getFormField(degree, 'contractDate'),
          contractNumber: this.getFormField(degree, 'contractNumber'),
          admissionDate: this.getFormField(degree, 'admissionDate'),
          studentPreviousUniversities: this.fb.array(
            (degree['studentPreviousUniversities'] as StudentPreviousUniversity[])
              .map((SPU: StudentPreviousUniversity) => {
            return this.fb.group({
              id: SPU.id,
              universityName: SPU.universityName,
              studyStartDate: SPU.studyStartDate,
              studyEndDate: SPU.studyEndDate,
              academicCertificateNumber: SPU.academicCertificateNumber,
              academicCertificateDate: SPU.academicCertificateDate,
            })
          })),
          payment: this.getFormField(degree, 'payment'),
          active: degree.active
        })
      }))
    });
  }

  getFormField(degree: StudentDegree, field: string) {
    return [{value: degree[field], disabled: !degree.active}]
  }

  getStudentGroup(i: number) {
    return (this.model as any).degrees[i].studentGroup;
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

  submit() {
    super.submit();
    if (this.form.invalid) {
      this.tabValidity = (this.form.controls.degrees as FormArray).controls.map(
        control => control.invalid
      );
      return;
    }
    const degrees = this.form.value.degrees.filter(degree => degree.active);
    this.studentService.updateStudentDegreesByStudentId(this.model.id, degrees).subscribe(() => {
      this.onSubmit.emit();
      this.modal.hide();
    });
  }
}
