import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {FormGroup} from '@angular/forms';
import {Department} from '../../../models/Department';
import {DepartmentService} from '../../../services/department.service';

@Component({
  selector: 'delete-department',
  templateUrl: './delete-department.component.html',
  styleUrls: ['./delete-department.component.scss']
})
export class DeleteDepartmentComponent {

  @ViewChild('modal') modal: ModalWrapperComponent;
  @Output() showErrorAlert: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteDepartment: EventEmitter<any> = new EventEmitter<any>();

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
    this.departmentService.delete(this.department.id).subscribe(
      department => {
        this.deleteDepartment.emit(department);
        this.hideModal();
      }
    )
  }

}
