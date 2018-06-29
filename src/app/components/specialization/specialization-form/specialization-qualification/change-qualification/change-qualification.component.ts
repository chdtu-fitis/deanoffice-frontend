import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {SpecializationModalComponent} from '../../../specialization-modal/specialization-modal.component';
import {Observable} from 'rxjs/Observable';
import {ProfessionalQualification} from '../../models/professional-qualification';
import {QualificationService} from '../../services/qualification.service';

@Component({
  selector: 'change-qualification',
  templateUrl: './change-qualification.component.html',
  styleUrls: ['./change-qualification.component.scss']
})
export class ChangeQualificationComponent {
  @Output() onSubmit: EventEmitter<ProfessionalQualification> = new EventEmitter<ProfessionalQualification>();
  @ViewChild('modal') modal: SpecializationModalComponent;
  private _selected: ProfessionalQualification;
  qualifications: Observable<ProfessionalQualification[]>;

  constructor(private _service: QualificationService) { }

  open(): void {
    this.qualifications = this._service.getAll();
    this.modal.show();
  }

  hide(): void {
    this.modal.hide();
    this._selected = null;
  }

  submit(): void {
    this.onSubmit.emit(this._selected);
    this.hide();
  }

  select(item: ProfessionalQualification): void {
    if (!this.hasSelected()) {
      this._selected = item;
    } else if (item.id !== this._selected.id) {
      this._selected = item;
    }
  }

  getItemClass(itemId: number): string {
    if (!this.hasSelected()) {
      return 'qualification';
    }
    if (itemId === this._selected.id) {
      return 'qualification selected';
    }
    return 'qualification';
  }

  hasSelected(): boolean {
    return Boolean(this._selected);
  }
}
