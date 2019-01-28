import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalWrapperComponent} from '../../../../shared/modal-wrapper/modal-wrapper.component';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../../models/professional-qualification';
import {QualificationService} from '../../services/qualification.service';
import {getId} from '../../../../../models/basemodels/BaseEntity';
import {ModalMargin} from '../../../../shared/modal-wrapper/models/modal-margin';

import 'rxjs/add/operator/map';

@Component({
  selector: 'change-qualification',
  templateUrl: './change-qualification.component.html',
  styleUrls: ['./change-qualification.component.scss']
})
export class ChangeQualificationComponent {
  @Input() canEdit: boolean;
  @Input() qualificationsYear: number;
  @Output() onSubmit: EventEmitter<ProfessionalQualification[]> = new EventEmitter<ProfessionalQualification[]>();
  @Output() allowEditing: EventEmitter<null> = new EventEmitter<null>();
  @ViewChild('modal') modal: ModalWrapperComponent;
  private selected: ProfessionalQualification[] = [];
  qualifications: Observable<ProfessionalQualification[]>;
  isOpen = false;
  modalMargin = new ModalMargin('10px', '10px', '10px', '10px');
  searchedName = '';
  searchedCode = '';

  constructor(private _service: QualificationService) {}

  open(selected: ProfessionalQualification[]): void {
    this.qualifications = this._service.getAll();
    this.selected = [...selected];
    this.isOpen = true;
    this.modal.show();
  }

  hide(): void {
    this.modal.hide();
    this.selected = [];
    this.isOpen = false;
  }

  submit(): void {
    this.onSubmit.emit(this.selected);
    this.hide();
  }

  select(item: ProfessionalQualification): void {
    if (this.canEdit) {
      if (this.isSelected(item.id)) {
        const itemIndex: number = this.selected.map(getId).indexOf(item.id);
        this.selected.splice(itemIndex, 1);
      } else {
        this.selected.push(item);
      }
    }
  }

  private isSelected(itemId: number): boolean {
    return this.selected.map(getId).includes(itemId);
  }

  getItemClass(itemId: number): string {
    if (this.isSelected(itemId)) {
      return 'qualification selected can-selected';
    }
    if (this.canEdit) {
      return 'qualification can-selected';
    }
    return 'qualification'
  }

  createForNewYear(): void {
    this.allowEditing.emit();
  }
}
