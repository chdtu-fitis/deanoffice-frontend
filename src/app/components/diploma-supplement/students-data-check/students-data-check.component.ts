import { Component } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {DataForSupplementStudentCheck} from '../../../models/custom/DataForSupplementStudentCheck';

@Component({
  selector: 'students-data-check',
  templateUrl: './students-data-check.component.html',
  styleUrls: ['./students-data-check.component.scss']
})
export class StudentsDataCheckComponent {
  studentsCheckData: DataForSupplementStudentCheck[];
  header: String;
  constructor(public bsModalRef: BsModalRef) {}

}
