import {Component, Input, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {Student} from '../../../models/Student';
import {StudentService} from '../../../services/student.service';
import {StudentPersonalInfoComponent} from '../student-personal-info/student-personal-info.component';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';
import {StudentDegree} from '../../../models/StudentDegree';
import {StudentDegreeInfoComponent} from '../student-degree-info/student-degree-info.component';

@Component({
  selector: 'student-all-info',
  templateUrl: './student-all-info.component.html',
  styleUrls: ['./student-all-info.component.scss']
})
export class StudentAllInfoComponent {
  groups;
  @Input() editable: boolean;
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('studentPersonalInfo') studentPersonalInfo: StudentPersonalInfoComponent;
  @ViewChild('studentDegreeInfo') studentDegreeInfo: StudentDegreeInfoComponent;

  constructor(
    private studentService: StudentService,
    private groupService: GroupService
  ) { }

  hideModal(): void {
    this.modal.hide();
  }

  openModal(id) {
    this.studentService.getStudentById(id).subscribe((student: Student) => {
      this.studentPersonalInfo.model = student;
      this.studentPersonalInfo.buildForm();
      this.modal.show();
    });
    this.studentService.getDegreesByStudentId(id).subscribe((studentDegrees: StudentDegree) => {
      this.studentDegreeInfo.model = studentDegrees;
      this.studentDegreeInfo.model['degrees'].sort( (a, b) => b.active - a.active );
      this.studentDegreeInfo.buildForm();
    });
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

}
