import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {FormGroup} from '@angular/forms';
import {Department} from '../../../models/Department';
import {DepartmentService} from '../../../services/department.service';

@Component({
  selector: 'recovery-department',
  templateUrl: './recovery-department.component.html',
  styleUrls: ['./recovery-department.component.scss']
})
export class RecoveryDepartmentComponent {

  @ViewChild('modal') modal: ModalWrapperComponent;
  @Output() recoveryDepartment: EventEmitter<any> = new EventEmitter<any>();

  form = new FormGroup({});
  department: Department;

  constructor(private departmentService: DepartmentService) {}

  showModal(department: Department) {
    this.department = department;
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  submit() {
    this.departmentService.restore(this.department.id).subscribe(
      department => {
        this.recoveryDepartment.emit(department);
        this.hideModal();
      }
    )
  }
}
