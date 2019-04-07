import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {DepartmentFormComponent} from '../department-form/department-form.component';
import {DepartmentService} from '../../../services/department.service';

@Component({
  selector: 'add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {


  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('form') form: DepartmentFormComponent;
  @Output() addDepartment: EventEmitter<any> = new EventEmitter<any>();


  constructor(private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.form.setValues({
      'name': '',
      'abbr': ''
    })
  }

  hideModal() {
    this.modal.hide();
  }

  showModal() {
    this.modal.show()
  }

  submit() {
    const body = this.form.form.getRawValue();
    body.active = true;
    this.departmentService.create(body)
      .then(department => this.addDepartment.emit(department))
      .then(() => this.hideModal())
      .catch(null);
  }

}
