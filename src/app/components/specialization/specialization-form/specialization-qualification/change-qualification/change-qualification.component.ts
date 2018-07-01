import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {SpecializationModalComponent} from '../../../specialization-modal/specialization-modal.component';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../../models/professional-qualification';
import {QualificationService} from '../../services/qualification.service';
import {getId} from '../../../../../models/basemodels/BaseEntity';

import 'rxjs/add/operator/map';

@Component({
  selector: 'change-qualification',
  templateUrl: './change-qualification.component.html',
  styleUrls: ['./change-qualification.component.scss']
})
export class ChangeQualificationComponent {
  @Output() onSubmit: EventEmitter<ProfessionalQualification[]> = new EventEmitter<ProfessionalQualification[]>();
  @ViewChild('modal') modal: SpecializationModalComponent;
  private _selected: ProfessionalQualification[] = [];
  qualifications: Observable<ProfessionalQualification[]>;

  constructor(private _service: QualificationService) { }

  open(selected: ProfessionalQualification[]): void {
    this.qualifications = this._service.getAll();
    this._selected = [...selected];
    this.modal.show();
  }

  hide(): void {
    this.modal.hide();
    this._selected = [];
  }

  submit(): void {
    this.onSubmit.emit(this._selected);
    this.hide();
  }

  select(item: ProfessionalQualification): void {
    if (this.isSelected(item.id)) {
      const itemIndex: number = this._selected.map(getId).indexOf(item.id);
      this._selected.splice(itemIndex, 1);
    } else {
      this._selected.push(item);
    }
  }

  private isSelected(itemId: number): boolean {
    return this._selected.map(getId).includes(itemId);
  }

  getItemClass(itemId: number): string {
    if (this.isSelected(itemId)) {
      return 'qualification selected';
    }
    return 'qualification';
  }
}
