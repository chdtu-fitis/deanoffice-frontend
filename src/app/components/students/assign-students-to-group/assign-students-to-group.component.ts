import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';

import {StudentDegree} from '../../../models/StudentDegree';
import {StudentGroup} from '../../../models/StudentGroup';
import {FormControl, Validators} from '@angular/forms';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'assign-students-to-group',
  templateUrl: './assign-students-to-group.component.html',
  styleUrls: ['./assign-students-to-group.component.scss']
})
export class AssignStudentsToGroupComponent {

  degrees;
  students;
  group = new FormControl(null, Validators.required);
  @ViewChild('modal', { static: false }) modal: ModalDirective;
  @Input() groups: StudentGroup[];
  @Output() onSubmit = new EventEmitter();

  constructor(private studentService: StudentService) { }

  openModal(degrees: StudentDegree[]) {
    this.group.setValue(this.groups[0]);
    this.degrees = degrees;
    this.students = degrees.map(degree => ({
      id: degree.id,
      fullName: degree.student.surname + ' ' + degree.student.name + ' ' + degree.student.patronimic,
      group: degree.studentGroup ? degree.studentGroup.name : null
    })).sort();
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  submit() {
    this.studentService.assignStudentsToGroup(
      this.students.map( student => student.id),
      this.group.value.id
    ).subscribe(() => {
      this.degrees.forEach(degree => {
        degree.studentGroup = this.groups.find(group => {
          return group.id === this.group.value.id;
        });
      });
      this.onSubmit.emit(this.group.value);
      this.hideModal();
    });
  }

}
