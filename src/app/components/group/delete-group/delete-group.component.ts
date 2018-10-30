import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {GroupModalComponent} from '../group-modal/group-modal.component'
import {StudentGroup} from '../../../models/StudentGroup';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;

  groups: StudentGroup[];

  form = new FormGroup({});

  constructor(private groupService: GroupService) { }

  openModal(items: StudentGroup[]): void {
    this.groups = items;
    this.modal.show();
  }

  submit(): void {
    const IsConfirm = confirm('Ви дійсно бажаєте видалити обрані групи?');
    if (IsConfirm) {
      this.groupService
        .delete(this.groups.map(x => x.id))
        .then(() => this.onSubmit.emit(null))
        .then(() => this.modal.hide());
    }
  }

  hideModal(): void {
    this.modal.hide();
  }
}
