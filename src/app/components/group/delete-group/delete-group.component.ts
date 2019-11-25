import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent {
  @Output() deleteGroup: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;

  groups: StudentGroup[];

  form = new FormGroup({});

  constructor(private groupService: GroupService) { }

  openModal(items: StudentGroup[]): void {
    this.groups = items;
    this.modal.show();
  }

  submit(): void {
    this.groupService
      .delete(this.groups.map(x => x.id))
      .subscribe((deletedGroups: StudentGroup[]) => {
        this.deleteGroup.emit(deletedGroups);
        this.modal.hide();
      })
  }

  hideModal(): void {
    this.modal.hide();
  }
}
