import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {modalLarge} from '../../shared/modal-wrapper/constant';
import {StudentPersonalInfoComponent} from '../student-personal-info/student-personal-info.component';

@Component({
  selector: 'student-personal-info-modal',
  templateUrl: './student-personal-info-modal.component.html',
  styleUrls: ['./student-personal-info-modal.component.scss']
})
export class StudentPersonalInfoModalComponent {
  modalStyles = modalLarge;
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('studentPersonalInfo') studentPersonalInfo: StudentPersonalInfoComponent;
  @Output() onSubmit = new EventEmitter();

  openModal(id: number) {
    this.studentPersonalInfo.renderForm(id);
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit(studentInfo) {
    this.onSubmit.emit(studentInfo)
  }

}
