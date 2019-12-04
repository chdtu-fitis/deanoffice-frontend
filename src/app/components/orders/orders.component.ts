import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {defaultColDef, ordersDefaults} from './constants';
import {OrdersService} from '../../services/orders.service';
import {flatMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  ordersForm: FormGroup;
  colDefaults = ordersDefaults;
  columnColDef = defaultColDef;
  rowData;
  lastSelectedRowIndex = null;
  selectedRowStatus = null;

  private gridApi;
  private gridColumnApi;


  private ngUnsubscribe: Subject<any> = new Subject();
  private selectedOrder: any[];

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit() {
    this.buildForm();
    this.ordersService.getOrders(this.ordersForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(ordersData => {
        this.rowData = ordersData;
      });

    this.ordersForm.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe),
      flatMap(ordersStatuses => this.ordersService.getOrders(ordersStatuses).pipe(takeUntil(this.ngUnsubscribe)))
    ).subscribe(ordersData => {
      this.rowData = ordersData;
    })
  }

  onSelectionChanged() {
    this.selectedOrder = this.gridApi.getSelectedRows();
    this.selectedRowStatus = this.selectedOrder.length ? this.selectedOrder[0].status : null;
  }

  onRowClicked(row) {
    const rowNode = this.gridApi.getRowNode(row.rowIndex);
    if (this.lastSelectedRowIndex === row.rowIndex) {
      rowNode.setSelected(false);
      this.lastSelectedRowIndex = null;
    } else {
      rowNode.setSelected(true);
      this.lastSelectedRowIndex = row.rowIndex;
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onModelUpdated(params) {
    console.log(params);
  }

  buildForm() {
    this.ordersForm = new FormGroup({
      activeOrder: new FormControl(true),
      draftOrder: new FormControl(false),
      rejectedOrder: new FormControl(false)
    })
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
