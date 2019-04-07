import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../shared/modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {


  @ViewChild('modal') modal: ModalWrapperComponent;


  constructor() {
  }

  ngOnInit() {
  }

  hideModal() {
    this.modal.hide();
  }

  showModal() {
    this.modal.show()
  }

}
