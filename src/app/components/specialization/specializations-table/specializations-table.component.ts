import {Component, Input} from '@angular/core';
import {Specialization} from '../../../models/Specialization';

@Component({
  selector: 'specializations-table',
  templateUrl: './specializations-table.component.html',
  styleUrls: ['./specializations-table.component.scss']
})
export class SpecializationsTableComponent {
  @Input() rows: Specialization[] = [];

  selectAll(event: boolean): void {
    console.log(event);
  }

  selectItem(event: boolean, id: number) {
    console.log(event, id);
  }
}
