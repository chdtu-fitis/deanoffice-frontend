import { Component, NgModule, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {Degree} from '../../../models/Degree';
import {DegreeService} from '../../../services/degree.service';

@Component({
  selector: 'group-names-generation',
  templateUrl: './group-names-generation.component.html',
  styleUrls: ['./group-names-generation.component.scss']
})
export class GroupNamesGenerationComponent implements OnInit {
  studentsYear: string = "1";
  currentDegree: Degree;
  degrees: Degree[];
  constructor(public bsModalRef: BsModalRef, private degreeService: DegreeService,  private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit() {
    this.currentDegree = this.degrees[0];
  }

  saveNames() {
    this.selectiveCourseService.saveGeneratedNames(this.studentsYear, this.currentDegree.id);
    this.bsModalRef.hide();
  }
}
