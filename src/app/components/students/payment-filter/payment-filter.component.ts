import { Component } from '@angular/core';
import {IDoesFilterPassParams, IFilterParams, RowNode} from 'ag-grid-community';
import {IFilterAngularComp} from 'ag-grid-angular';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'payment-filter',
  templateUrl: './payment-filter.component.html',
  styleUrls: ['./payment-filter.component.scss']
})
export class PaymentFilterComponent implements IFilterAngularComp {
  private params: IFilterParams;
  private valueGetter: (rowNode: RowNode) => any;
  text;

  form;
  model = {
    payment: [
      {name: 'бюджет', selected: true},
      {name: 'контракт', selected: true},
    ],
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      payment: this.fb.array(this.model.payment.map(entry =>
        this.fb.group(entry)),
      ),
    });
    this.onChanges();
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      console.log(this.form.value.payment);
      this.params.filterChangedCallback();
    });
  }

  get payment(): FormArray { return this.form.get('payment') as FormArray; }

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
  }

  isFilterActive(): boolean {
    return true;
  }

  doesFilterPass(params: IDoesFilterPassParams): boolean {
    const payments = this.form.value.payment
      .filter(val => val.selected)
      .map(val => val.name);
    return payments.includes(this.valueGetter(params.node));
  }

  getModel(): any {
    return {value: this.text};
  }

  setModel(model: any): void {
    this.text = model ? model.value : '';
  }

}
