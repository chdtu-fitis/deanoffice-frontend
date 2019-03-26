import { Component, OnInit } from '@angular/core';
import {DataForSupplementStudentCheck} from '../../../models/custom/DataForSupplementStudentCheck';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'courses-translation-check',
  templateUrl: './courses-translation-check.component.html',
  styleUrls: ['./courses-translation-check.component.scss']
})
export class CoursesTranslationCheckComponent {
  coursesTranslationCheckData: DataForSupplementStudentCheck[];
  header: String;
  constructor(public bsModalRef: BsModalRef) {}
}
