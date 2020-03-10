import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
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

  @Output() updateGroup: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;
  @ViewChild('form', { static: false }) form: GroupFormComponent;
  @Input() tuitionFormsKeys;
  @Input() tuitionForms;
  @Input() tuitionTermsKeys;
  @Input() tuitionTerms;
  @Input() specializations: Specialization[];
  selectedGroup: StudentGroup;

  constructor(private groupService: GroupService) { }

  openModal(selectedGroup): void {
    this.selectedGroup = selectedGroup;
    this.form.setValues({
      'name': selectedGroup.name,
      'studySemesters': selectedGroup.studySemesters,
      'studyYears': selectedGroup.studyYears,
      'beginYears': selectedGroup.beginYears,
      'creationYear': selectedGroup.creationYear,
      'tuitionForm': selectedGroup.tuitionForm,
      'tuitionTerm': selectedGroup.tuitionTerm,
      'specialization': selectedGroup.specialization.id
    });
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
      .then(group => this.updateGroup.emit(group))
      .then(() => this.hideModal())
      .catch(null);
  }

}
