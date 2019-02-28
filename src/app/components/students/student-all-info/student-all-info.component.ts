import {Component, Input, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {modalLarge} from '../../shared/modal-wrapper/constant';
import {StudentService} from '../../../services/student.service';
import {StudentPersonalInfoComponent} from '../student-personal-info/student-personal-info.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';
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
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('studentPersonalInfo') studentPersonalInfo: StudentPersonalInfoComponent;
  @ViewChild('studentDegreeInfo') studentDegreeInfo: StudentDegreeInfoComponent;
  @ViewChild('studentHistory') studentHistory: StudentDegreeHistoryComponent;

  constructor(
    private studentService: StudentService,
    private groupService: GroupService
  ) { }

  hideModal(): void {
    this.modal.hide();
  }

  openModal(studentDegree) {
    this.studentPersonalInfo.renderForm(studentDegree.student.id);
    this.studentDegreeInfo.renderForm(studentDegree.student.id, studentDegree.id);
    this.studentHistory.renderForm(studentDegree.id);
    this.groupService.getGroups(false).subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
    this.modal.show();
  }

}
