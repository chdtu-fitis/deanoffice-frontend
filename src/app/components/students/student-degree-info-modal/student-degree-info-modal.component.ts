import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {StudentDegree} from '../../../models/StudentDegree';
import {StudentService} from '../../../services/student.service';
import {StudentDegreeInfoComponent} from '../student-degree-info/student-degree-info.component';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'student-degree-info-modal',
  templateUrl: './student-degree-info-modal.component.html',
  styleUrls: ['./student-degree-info-modal.component.scss']
})
export class StudentDegreeInfoModalComponent {
  @Input() groups: StudentGroup[];
  @Output() onSubmit = new EventEmitter();
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('studentDegreeInfo') studentDegreeInfo: StudentDegreeInfoComponent;

  constructor(private studentService: StudentService) { }

  openModal(id) {
    this.studentService.getDegreesByStudentId(id).subscribe((studentDegrees: StudentDegree) => {
      this.studentDegreeInfo.model = studentDegrees;
      this.studentDegreeInfo.model['degrees'].sort( (a, b) => b.active - a.active );
      this.studentDegreeInfo.buildForm();
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
