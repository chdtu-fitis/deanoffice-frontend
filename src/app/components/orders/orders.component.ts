import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {defaultColDef, ordersDefaults} from './constants';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: FormGroup;
  colDefaults = ordersDefaults;
  columnColDef = defaultColDef;

  rowData = [
    {number: '15H0O-T'},
    {number: '75PO-8'}
    ];

  constructor() {
  }

  ngOnInit() {
    this.buildForm();
    this.orders.valueChanges.subscribe(result => {
    })
  }


  buildForm() {
    this.orders = new FormGroup({
      activeOrder: new FormControl(true),
      draftOrder: new FormControl(false),
      rejectedOrder: new FormControl(false)
    })
  }

}
