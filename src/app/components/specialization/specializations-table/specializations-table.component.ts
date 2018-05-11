import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Specialization} from '../../../models/Specialization';


class SpecializationWithSelected extends Specialization {
  isSelected: boolean;
}

@Component({
  selector: 'app-specializations-table',
  templateUrl: './specializations-table.component.html',
  styleUrls: ['./specializations-table.component.scss']
})
export class SpecializationsTableComponent {
  @Input() set setRows(rows: SpecializationWithSelected[]) {
    this.rows = rows;
    this.selectedSpecializations = [];
    this.emitSelectedSpecializations();
  };

  @Input() loading: boolean;
  @Output() selectedRows: EventEmitter<Specialization[]> = new EventEmitter<Specialization[]>();
  private selectedSpecializations: Specialization[] = [];
  rows: SpecializationWithSelected[];
  allRowsIsSelected = false;

  selectAll(event: boolean): void {
    if (this.loading) {
      return;
    }
    if (event) {
      this.selectedSpecializations = [...this.rows];
    } else {
      this.selectedSpecializations = [];
    }
    this.changeAllIsSelected(event);
    this.emitSelectedSpecializations();
  }

  emitSelectedSpecializations(): void {
    this.selectedRows.emit(this.selectedSpecializations);
  }

  private changeAllIsSelected(isSelected: boolean): void {
    this.rows.forEach((item: SpecializationWithSelected) => item.isSelected = isSelected);
    this.allRowsIsSelected = isSelected;
  }

  selectItem(event: boolean, id: number): void {
    if (event) {
      const selectedItem: Specialization = this.findSpecialization(id);
      this.selectedSpecializations.push(selectedItem);
    } else {
      const itemIndex: number = this.selectedSpecializations.indexOf(this.findSpecialization(id));
      this.selectedSpecializations.splice(itemIndex, 1);
    }
    this.changeIsSelected(id, event);
    this.emitSelectedSpecializations();
  }

  private findSpecialization(id: number): SpecializationWithSelected {
    return this.rows.find((item: SpecializationWithSelected) => item.id === id);
  }

  private changeIsSelected(id: number, isSelected: boolean): void {
    this.findSpecialization(id).isSelected = isSelected;
    this.allRowsIsSelected = this.isAllRowsSelected();
  }

  private isAllRowsSelected(): boolean {
    const getIdFromSpecializations = (item: Specialization) => item.id;
    const rowIds: number[] = this.rows.map(getIdFromSpecializations);
    const selectedRowIds: number[] = this.selectedSpecializations.map(getIdFromSpecializations);
    return rowIds.length === selectedRowIds.length && rowIds.length !== 0;
  }

  getTableRowClass(isSelected: boolean) {
    return (isSelected) ? 'table-success' : '';
  }
}
