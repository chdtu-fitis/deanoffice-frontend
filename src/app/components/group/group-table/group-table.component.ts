import {Component, Input} from '@angular/core';
import {StudentGroup} from '../../../models/StudentGroup';
import {TuitionTerm} from '../../../models/tuition-term.enum';
import {TuitionForm} from '../../../models/tuition-form.enum';

@Component({
  selector: 'group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.scss']
})
export class GroupTableComponent {
  @Input('rows') rows: StudentGroup[];
  @Input() searchText: string;

  @Input() loading: boolean;




}
