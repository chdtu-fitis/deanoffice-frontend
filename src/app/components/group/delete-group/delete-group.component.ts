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

  @Output() showErrorAlert: EventEmitter<any> = new EventEmitter<any>();
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
    this.groupService
      .delete(this.groups.map(x => x.id))
      .subscribe((deletedGroups: StudentGroup[]) => {
        const deletedGroupsIds = deletedGroups.map(x => x.id);
        const errors = this.groups.filter(item => {
          return !deletedGroupsIds.includes(item.id);
        });
        for (let i = 0; i < errors.length; i++) {
          this.showErrorAlert.emit({
            message: `Неможливе видалення групи ${errors[i].name} <br>(в групі є студенти)`
          });
        }
        this.onSubmit.emit();
        this.modal.hide();
      })
  }

  hideModal(): void {
    this.modal.hide();
  }
}
