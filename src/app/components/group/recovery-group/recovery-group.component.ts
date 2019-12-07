import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {FormGroup} from '@angular/forms';
import {GroupComponent} from '../group.component';

@Component({
  selector: 'recovery-group',
  templateUrl: './recovery-group.component.html',
  styleUrls: ['./recovery-group.component.scss']
})
export class RecoveryGroupComponent {
  @Output() recoveryGroup: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;

  groups: StudentGroup[];

  form = new FormGroup({});

  constructor(
    private groupService: GroupService,
    private groupComponent: GroupComponent,
  ) { }

  openModal(items: StudentGroup[]): void {
    this.groups = items;
    this.modal.show();
  }

  submit(): void {
    this.groupService
      .restore(this.groups.map(x => x.id))
      .subscribe(() => {
        this.modal.hide();
        this.groupComponent.onRecoveryGroup(this.groups);
      });
  }

  hideModal(): void {
    this.modal.hide();
  }
}
