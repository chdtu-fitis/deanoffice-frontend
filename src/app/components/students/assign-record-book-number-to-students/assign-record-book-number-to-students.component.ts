import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap';

import { StudentDegree } from '../../../models/StudentDegree';
import { StudentGroup } from '../../../models/StudentGroup';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'assign-record-book-number-to-students',
  templateUrl: './assign-record-book-number-to-students.component.html',
  styleUrls: [ './assign-record-book-number-to-students.component.scss' ]
})
export class AssignRecordBookNumberToStudentsComponent {
  students;
  studentDegrees;
  form: FormGroup;
  initialRecordBookNumber = new FormControl('', Validators.required);
  series;
  recordBookNumber;
  @ViewChild('modal') modal: ModalDirective;
  @Input() groups: StudentGroup[];
  @Output() onSubmit = new EventEmitter();

  constructor(private fb: FormBuilder, private studentService: StudentService) { }

  openModal(studentDegrees: StudentDegree[]) {
    this.studentDegrees = studentDegrees;
    this.studentDegrees.sort( (a, b) => {
      let first = a.student.surname + ' ' + a.student.name + ' ' + a.student.patronimic;
      let second = b.student.surname + ' ' + b.student.name + ' ' + b.student.patronimic;
      if (first < second) { return -1; }
      if (first > second) { return 1; }
      return 0;
    });
    this.students = this.studentDegrees.map(studentDegree => ({
      id: studentDegree.id,
      fullName: `${studentDegree.student.surname} ${studentDegree.student.name} ${studentDegree.student.patronimic}`,
      recordBookNumber: studentDegree.recordBookNumber
    }));
    this.buildForm();
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  buildForm() {
    this.form = this.fb.group({
      studentDegrees: this.fb.array((this.students).map((studentDegree) => {
        return this.fb.group({
          id: studentDegree.id,
          fullName: studentDegree.fullName,
          recordBookNumber: studentDegree.recordBookNumber
        });
      }))
    });
  }

  get formStudentDegrees() {
    return this.form.get('studentDegrees') as FormArray;
  }

  generateRecordBookNumbers() {
    const firstIntIndex = this.initialRecordBookNumber.value.search(/\d/);
    this.series = this.initialRecordBookNumber.value.slice(0, firstIntIndex);
    this.recordBookNumber = this.initialRecordBookNumber.value.slice(firstIntIndex);
    for (let i = 0; i < this.formStudentDegrees.controls.length; i++) {
      const recordBookNumber = `${this.series}${Number(this.recordBookNumber) + i}`;
      (this.formStudentDegrees.controls[i] as FormGroup).controls.recordBookNumber.setValue(recordBookNumber);
    }
  }

  submit() {
    const studentDegreesWithRecordBookNumber = this.form.value.studentDegrees.filter((studentDegree) =>
      studentDegree.recordBookNumber
    );
    const degreesForSubmit = {};
    studentDegreesWithRecordBookNumber.forEach(studentDegree => {
      degreesForSubmit[studentDegree.id] = studentDegree.recordBookNumber;
    });
    this.studentService.assignRecordBookNumberToStudents(degreesForSubmit).subscribe(() => {
      for (let i = 0; i < this.form.value.studentDegrees.length; i++) {
        this.studentDegrees[i].recordBookNumber = this.form.value.studentDegrees[i].recordBookNumber;
      }
      this.initialRecordBookNumber.setValue('');
      this.onSubmit.emit();
      this.hideModal();
    });
  }

}
