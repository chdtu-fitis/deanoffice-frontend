import {Component, Input, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {modalLarge} from '../../shared/modal-wrapper/constant';
import {StudentPersonalInfoComponent} from '../student-personal-info/student-personal-info.component';
import {StudentDegreeInfoComponent} from '../student-degree-info/student-degree-info.component';
import {StudentDegreeHistoryComponent} from '../student-degree-history/student-degree-history.component';

@Component({
  selector: 'student-all-info',
  templateUrl: './student-all-info.component.html',
  styleUrls: ['./student-all-info.component.scss']
})
export class StudentAllInfoComponent {
  groups;
  modalStyles = modalLarge;
  @Input() editable: boolean;
  @ViewChild('modal', { static: false }) modal: ModalWrapperComponent;
  @ViewChild('studentPersonalInfo', { static: false }) studentPersonalInfo: StudentPersonalInfoComponent;
  @ViewChild('studentDegreeInfo', { static: false }) studentDegreeInfo: StudentDegreeInfoComponent;
  @ViewChild('studentHistory', { static: false }) studentHistory: StudentDegreeHistoryComponent;

  hideModal(): void {
    this.modal.hide();
  }

  openModal(studentDegree) {
    this.studentPersonalInfo.renderForm(studentDegree.student.id);
    this.studentDegreeInfo.renderForm(studentDegree.student.id, studentDegree.id);
    this.studentHistory.renderForm(studentDegree.id);
    this.modal.show();
  }

}
