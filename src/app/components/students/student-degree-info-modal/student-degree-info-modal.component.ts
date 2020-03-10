import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {modalLarge} from '../../shared/modal-wrapper/constant';
import {StudentDegreeInfoComponent} from '../student-degree-info/student-degree-info.component';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'student-degree-info-modal',
  templateUrl: './student-degree-info-modal.component.html',
  styleUrls: ['./student-degree-info-modal.component.scss']
})
export class StudentDegreeInfoModalComponent {
  modalStyles = modalLarge;
  @Input() groups: StudentGroup[];
  @Output() onSubmit = new EventEmitter();
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;
  @ViewChild('studentDegreeInfo', { static: false }) studentDegreeInfo: StudentDegreeInfoComponent;

  openModal(id) {
    this.studentDegreeInfo.renderForm(id);
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(degrees) {
    this.onSubmit.emit(degrees)
  }

}
