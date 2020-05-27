import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-deduction-order',
  templateUrl: './deduction-order.component.html',
  styleUrls: ['./deduction-order.component.scss']
})
export class DeductionOrderComponent implements OnInit {

  public deductionOrder: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this._initForm();
  }

  private _initForm() {
    this.deductionOrder = this.fb.group({
    })
  }

}
