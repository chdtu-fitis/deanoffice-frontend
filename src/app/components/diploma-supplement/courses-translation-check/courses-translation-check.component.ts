import { Component } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {DataForSupplementCourseTranslationCheck} from '../../../models/custom/DataForSupplementCourseTranslationCheck';

@Component({
  selector: 'courses-translation-check',
  templateUrl: './courses-translation-check.component.html',
  styleUrls: ['./courses-translation-check.component.scss']
})
export class CoursesTranslationCheckComponent {
  coursesTranslationCheckData: DataForSupplementCourseTranslationCheck[];
  header: String;
  constructor(public bsModalRef: BsModalRef) {}
}
