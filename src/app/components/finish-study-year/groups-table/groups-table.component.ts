import {Component, Input, OnChanges} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'groups-table',
  templateUrl: './groups-table.component.html',
  styleUrls: ['./groups-table.component.scss']
})
export class GroupsTableComponent implements OnChanges {
  allGroupIsSelected = true;
  @Input() groups: StudentGroup[];

  ngOnChanges() {
    this.allGroupIsSelected = true
  }

  onSelectAllGroups(checked: boolean) {
    this.groups.forEach(group => group.selected = checked);
  }

  onGroupSelect() {
    this.allGroupIsSelected = this.groups.every(group => group.selected);
  }

}
