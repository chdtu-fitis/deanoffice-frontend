import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {GroupModalComponent} from '../group-modal/group-modal.component'

import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;

  form = new FormGroup({
    first: new FormControl('Nancy', Validators.minLength(2)),
  });

  constructor(private groupService: GroupService) { }

  openModal(): void {
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(): void {
    const body = {
      id: 0,
      name: 'TEST-1844',
      active: false,
      studySemesters: 8,
      creationYear: 2004,
      specialization: {
        id: 25,
        name: '',
        speciality: {
          id: 11,
          name: 'Комп\'ютерні науки',
          code: '6.050101'
        },
        degree: {
          id: 1,
          name: 'Бакалавр'
        }
      },
      tuitionForm: 'FULL_TIME',
      tuitionTerm: 'REGULAR',
      studyYears: 4,
      beginYears: 1
    };

    this.groupService.create(body)
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }
}
