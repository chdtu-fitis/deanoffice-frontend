import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SpecializationModalComponent} from '../../../specialization-modal/specialization-modal.component';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../../models/professional-qualification';
import {QualificationService} from '../../services/qualification.service';
import {getId} from '../../../../../models/basemodels/BaseEntity';
import {SelectionMode} from '../../enums/selection-mode.enum';
import {SelectedQualification} from '../../models/selected-qualification';

import 'rxjs/add/operator/map';
import {ModalMargin} from '../../../specialization-modal/models/modal-margin';

@Component({
  selector: 'change-qualification',
  templateUrl: './change-qualification.component.html',
  styleUrls: ['./change-qualification.component.scss']
})
export class ChangeQualificationComponent {
  @Input() canEdit: boolean;
  @Input() qualificationsYear: number;
  @Output() onSubmit: EventEmitter<SelectedQualification> = new EventEmitter<SelectedQualification>();
  @ViewChild('modal') modal: SpecializationModalComponent;
  private _selected: ProfessionalQualification[] = [];
  private _selectionMode: SelectionMode = SelectionMode.ADD;
  currentCanEdit: boolean;
  qualifications: Observable<ProfessionalQualification[]>;
  modalPadding = new ModalMargin('0', '10px', '0', '10px');

  constructor(private _service: QualificationService) {}

  open(selected: ProfessionalQualification[]): void {
    this.qualifications = this._service.getAll();
    this._selected = [...selected];
    this.currentCanEdit = this.canEdit;
    this.modal.show();
  }

  hide(): void {
    this.modal.hide();
    this._selected = [];
  }

  submit(): void {
    const selectedQualification: SelectedQualification = {
      qualifications: this._selected,
      selectionMode: this._selectionMode
    } as SelectedQualification;
    this.onSubmit.emit(selectedQualification);
    this._selectionMode = SelectionMode.ADD;
    this.hide();
  }

  select(item: ProfessionalQualification): void {
    if (this.currentCanEdit) {
      if (this.isSelected(item.id)) {
        const itemIndex: number = this._selected.map(getId).indexOf(item.id);
        this._selected.splice(itemIndex, 1);
      } else {
        this._selected.push(item);
      }
    }
  }

  private isSelected(itemId: number): boolean {
    return this._selected.map(getId).includes(itemId);
  }

  getItemClass(itemId: number): string {
    if (this.isSelected(itemId)) {
      return 'qualification selected can-selected';
    }
    if (this.currentCanEdit) {
      return 'qualification can-selected';
    }
    return 'qualification'
  }

  createForNewYear(): void {
    this._selectionMode = SelectionMode.ALL;
    this.currentCanEdit = true;
  }
}
