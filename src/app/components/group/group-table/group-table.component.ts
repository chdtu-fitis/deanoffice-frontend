import {Component, Input} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';

@Component({
  selector: 'app-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
  @Input('rows') rows: StudentGroup[];
}
