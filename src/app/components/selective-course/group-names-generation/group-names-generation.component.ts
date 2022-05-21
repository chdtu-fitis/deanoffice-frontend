import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {GroupService} from '../../../services/group.service';

@Component({
  selector: 'group-names-generation',
  templateUrl: './group-names-generation.component.html',
  styleUrls: ['./group-names-generation.component.scss']
})
export class GroupNamesGenerationComponent implements OnInit {
  studentsYear: string;
  degreeId: number;
  constructor() { }

  ngOnInit() {
  }

}
