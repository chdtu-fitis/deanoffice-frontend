import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {GroupModalComponent} from '../group-modal/group-modal.component';
import {GroupService} from '../../../services/group.service';
import {Specialization} from '../../../models/Specialization';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupFormComponent} from '../group-form/group-form.component';

@Component({
  selector: 'update-group',
  templateUrl: './update-group.component.html',
  styleUrls: ['./update-group.component.scss']
})
export class UpdateGroupComponent {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;
  @ViewChild('form') form: GroupFormComponent;
  @Input() tuitionFormsKeys;
  @Input() tuitionForms;
  @Input() tuitionTermsKeys;
  @Input() tuitionTerms;
  @Input() specializations: Specialization[];
  selectedGroup: StudentGroup;

  constructor(private groupService: GroupService) { }

  openModal(selectedGroup): void {
    this.selectedGroup = selectedGroup;
    const values = {};
    values['name'] = selectedGroup.name;
    values['studySemesters'] = selectedGroup.studySemesters;
    values['studyYears'] = selectedGroup.studyYears;
    values['beginYears'] = selectedGroup.beginYears;
    values['creationYear'] = selectedGroup.creationYear;
    values['tuitionForm'] = selectedGroup.tuitionForm;
    values['tuitionTerm'] = selectedGroup.tuitionTerm;
    values['specialization'] = selectedGroup.specialization.id;
    this.form.setValues(values);
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(): void {
    const body = this.form.form.getRawValue();
    body.id = this.selectedGroup.id;
    body.active = this.selectedGroup.active;
    body.specialization = {id: body.specialization};
    this.groupService.update(body)
      .then(() => this.onSubmit.emit(null))
      .then(() => this.hideModal())
      .catch(null);
  }

}
