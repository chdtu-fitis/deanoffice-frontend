import {Component} from '@angular/core';
import {IDoesFilterPassParams, IFilterParams, RowNode} from 'ag-grid-community';
import {IFilterAngularComp} from 'ag-grid-angular';
import {StudentGroup} from '../../../models/StudentGroup';
import {GroupService} from '../../../services/group.service';

@Component({
  selector: 'custom-filter',
  templateUrl: './custom-filter.component.html',
  styleUrls: ['./custom-filter.component.scss']
})
export class CustomFilterComponent implements IFilterAngularComp {
  private params: IFilterParams;
  private valueGetter: (rowNode: RowNode) => any;
  selectedGroup;
  groups;

  constructor(private groupService: GroupService) {
  }

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
    // TODO receive from student component
    this.groupService.getGroups().subscribe((groups: StudentGroup[]) => {
      this.groups = groups;
    });
  }

  isFilterActive(): boolean {
    return this.selectedGroup;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    return this.valueGetter(params.node) === this.selectedGroup;
  }

  getModel(): any {
    return {value: this.selectedGroup};
  }

  setModel(model: any): void {
    this.selectedGroup = model ? model.value : '';
  }

  onChange(): void {
    this.params.filterChangedCallback();
  }
}
