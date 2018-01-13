import {Component, Input, OnInit} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;

  constructor() { }

  ngOnInit() {
  }

}
