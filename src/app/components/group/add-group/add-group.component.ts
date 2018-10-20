import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {GroupModalComponent} from '../group-modal/group-modal.component'

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: GroupModalComponent;

  constructor(private groupService: GroupService) { }

  openModal(): void {
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
    // this.form.reset();
  }

  submit(): void {
    // if (this.form.invalid()) {
    //   return;
    // }
    // this.groupService
    //   .create(this.form.getValue())
    //   .then((res) => {
    //     this.form.saveCompetenciesAndQualification(res['id'] as number)
    //   })
    //   .then(() => this.onSubmit.emit(null))
    //   .then(() => this.hideModal())
    //   .catch(null);
  }
}
