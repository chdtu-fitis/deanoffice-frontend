import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DataForSupplementStudentCheck} from "../../../models/custom/DataForSupplementStudentCheck";

@Component({
  selector: 'students-data-check',
  templateUrl: './students-data-check.component.html',
  styleUrls: ['./students-data-check.component.scss']
})
export class StudentsDataCheckComponent {
  studentsCheckData: DataForSupplementStudentCheck[];
  header: String;
  constructor(public activeModal: NgbActiveModal) { }

  closeWindow() {
    this.activeModal.close('Close click')
  }

}
