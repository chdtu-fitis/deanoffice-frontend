import { Component, EventEmitter, Output, ViewChild, OnInit, Input } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { GroupFormComponent } from '../group-form/group-form.component';
import { Specialization } from '../../../models/Specialization';

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: [ './add-group.component.scss' ]
})
export class AddGroupComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;
  @ViewChild('form') form: GroupFormComponent;
  @Input() tuitionFormsKeys;
  @Input() tuitionForms;
  @Input() tuitionTermsKeys;
  @Input() tuitionTerms;
  @Input() specializations: Specialization[];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.form.setValues({
      'name': '',
      'studySemesters': 8,
      'studyYears': 3.84,
      'beginYears': 1,
      'creationYear': this.getValueOfCreationYear(),
      'tuitionForm': this.tuitionFormsKeys[0],
      'tuitionTerm': this.tuitionTermsKeys[0]
    });
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
    const body = this.form.form.getRawValue();
    body.active = 'false';
    body.specialization = { id: body.specialization };
    this.groupService.create(body)
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }
}
