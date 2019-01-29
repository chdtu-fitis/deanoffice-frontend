import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {Student} from '../../../models/Student';
import {StudentPersonalInfoComponent} from '../student-personal-info/student-personal-info.component';
import {StudentService} from '../../../services/student.service';

@Component({
  selector: 'student-personal-info-modal',
  templateUrl: './student-personal-info-modal.component.html',
  styleUrls: ['./student-personal-info-modal.component.scss']
})
export class StudentPersonalInfoModalComponent {
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('studentPersonalInfo') studentPersonalInfo: StudentPersonalInfoComponent;
  @Output() onSubmit = new EventEmitter();

  constructor(private studentService: StudentService) { }

  openModal(id) {
    this.studentService.getStudentById(id).subscribe((student: Student) => {
      this.studentPersonalInfo.model = student;
      this.studentPersonalInfo.buildForm();
      this.modal.show();
    });
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit() {
    this.onSubmit.emit()
  }

}
