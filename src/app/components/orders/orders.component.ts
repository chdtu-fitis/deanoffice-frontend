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
    {number: '15H0O-T',  type: 'Про переведення', date: new Date().toISOString(), status: 'Активний'},
    {number: '75PO-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Проект'},
    {number: '75EG-8', type: 'Про відрахування', date: new Date().toISOString(), status: 'Відхилений'}
    ];

  private gridApi;
  private gridColumnApi;

  constructor() {
  }

  ngOnInit() {
    this.buildForm();
    this.orders.valueChanges.subscribe(result => {
    })
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  buildForm() {
    this.orders = new FormGroup({
      activeOrder: new FormControl(true),
      draftOrder: new FormControl(false),
      rejectedOrder: new FormControl(false)
    })
  }

}
