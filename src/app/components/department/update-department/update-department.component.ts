import {Component, EventEmitter, Output, Input, ViewChild, OnInit, ViewChild, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';
import {DepartmentService} from '../../../services/department.service';
import {DepartmentFormComponent} from '../department-form/department-form.component';
import {Department} from '../../../models/Department';

@Component({
  selector: 'update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.scss']
})
export class UpdateDepartmentComponent implements OnInit {

  source: Department;
  @Input () selectedDepartments;
  @Output () updateDepartment: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('modal') modal: ModalWrapperComponent;
  @ViewChild('form') form: DepartmentFormComponent;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.form.setValues({
      'name': '',
      'abbr': ''
    })
  }

  showModal(department: Department) {
    this.source = department;
    this.modal.show();
  }

  getTitle(): string {
    const info: string = (this.source) ? `${this.source.name} ${this.source.abbr}` : '';
    return `Оновлення інформації про кафедру: ${info}`;
  }

  openModal(argument): void {
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
  }

  submit() {
    const body = this.form.form.getRawValue();
    body.active = true;
    this.departmentService.create(body)
      .then(department => this.addDepartment.emit(department))
      .then(() => this.hideModal())
      .catch(null);
  }

  /*getTitle(): string {
    const info: string = (this.source) ? `${this.source.surname} ${this.source.name} ${this.source.patronimic}` : '';
    return `Оновлення інформації про викладача: ${info}`;
  }

  openModal(argument): void {
    this.form.setInitialData(argument);
    this.modal.show();
  }

  hideModal(): void {
    this.modal.hide();
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid()) {
      return;
    }
    this.teacherService
      .updateTeacher(this.form.getValue())
      .then((teacher) => this.updateTeacher.emit(teacher))
      .then(() => this.hideModal())
      .catch(null);
  }*/

}
