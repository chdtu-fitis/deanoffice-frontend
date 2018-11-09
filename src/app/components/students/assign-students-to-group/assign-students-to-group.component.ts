import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

import {StudentDegree} from '../../../models/StudentDegree';
import {StudentGroup} from '../../../models/StudentGroup';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'assign-students-to-group',
  templateUrl: './assign-students-to-group.component.html',
  styleUrls: ['./assign-students-to-group.component.scss']
})
export class AssignStudentsToGroupComponent {

  students;
  form = new FormGroup({
    group: new FormControl(null, Validators.required)
  });
  @ViewChild('modal') modal: ModalDirective;
  @Input() groups: StudentGroup[];
  @Output() onSubmit = new EventEmitter();

  constructor(private studentService: StudentService) { }

  openModal(degrees: StudentDegree[]) {
    this.form.controls['group'].setValue(this.groups[0]);
    this.students = degrees.map(degree => ({
      ...degree.student,
      id: degree.id, groups:
      degree.studentGroup.name
    }));
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  submit() {
    this.studentService.assignStudentsToGroup(
      this.students.map( student => student.id),
      this.form.value.group.id
    ).subscribe(() => {
      this.onSubmit.emit();
      this.hideModal();
    });
  }

}
