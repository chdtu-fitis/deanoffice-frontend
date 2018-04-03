import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'grades-table',
  templateUrl: './grades-table.component.html',
  styleUrls: ['./grades-table.component.scss']
})
export class GradesTableComponent implements OnInit {
  @Input() studentsDegree;
  @Input() courses;
  constructor() { }

  ngOnInit() {
  }

}
