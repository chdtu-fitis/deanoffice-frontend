import {Component, OnInit} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';

@Component({
  selector: 'courses-for-groups',
  templateUrl: './courses-for-groups.component.html',
  styleUrls: ['./courses-for-groups.component.scss']
})
export class CoursesForGroupsComponent implements OnInit {
  selectedSemester: number;
  selectedGroup: StudentGroup;

  constructor() {
  }

  ngOnInit() {
  }

  changeGroup(event) {
    this.selectedGroup = event;
  }

  changeSemester(event) {
    this.selectedSemester = event;
  }

}
