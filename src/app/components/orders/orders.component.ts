import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {first, flatMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {AgGridModules, commonAgGridModules} from '../shared/ag-grid';

import {defaultColDef, ordersDefaults} from './constants';
import {OrdersService} from '../../services/orders.service';
import {DatePipe} from '@angular/common';
import {Order} from '../../models/order/Order';
import {OrdersControls} from "./orders-types";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  providers: [DatePipe],
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  public agGridModules: AgGridModules = commonAgGridModules;
  public ordersForm: FormGroup;
  public colDefaults = ordersDefaults;
  public columnColDef = defaultColDef;
  public rowData = [];
  public lastSelectedRowIndex = null;
  public selectedRowStatus = null;
  public renderedRows: any[] = [];

  private gridApi;
  private gridColumnApi;
  private selectedOrder: any[];

  private ordersControls: OrdersControls;

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private _ordersService: OrdersService, private datePipe: DatePipe) {
    this.ordersControls = {activeOrders: true, signedOrders: true, rejectedOrders: false};
  }

  ngOnInit() {
    this._getOrders();
    this.ordersFilter();
    // this._trackOrdersChanges();
  }

  public getAppropriateNodeIndex(rowIndex: number): number {
    const node = this.renderedRows.find((row) => rowIndex === row.data.number);
    return node.id;
  }

  public onSelectionChanged(): void {
    this.selectedOrder = this.gridApi.getSelectedRows();
    this.selectedRowStatus = this.selectedOrder.length ? this.selectedOrder[0].status : null;
    this.renderedRows = this.gridApi.getRenderedNodes();
  }

  public onRowClicked(row): void {
    const rowIndex: number = this.getAppropriateNodeIndex(row.data.number);
    const rowNode = this.gridApi.getRowNode(rowIndex.toString());

    if (this.lastSelectedRowIndex === row.rowIndex) {
      rowNode.setSelected(false);
      this.lastSelectedRowIndex = null;
    } else {
      rowNode.setSelected(true);
      this.lastSelectedRowIndex = row.rowIndex;
    }
  }

  public onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.renderedRows = this.gridApi.getRenderedNodes();
  }

  public onModelUpdated(params): void {
    console.log(this.renderedRows);
  }

  // private _trackOrdersChanges() {
  //   this.ordersForm.valueChanges.pipe(
  //     takeUntil(this.ngUnsubscribe),
  //     flatMap(ordersStatuses => this._ordersService.getOrders(ordersStatuses).pipe(first()))
  //   ).subscribe(ordersData => {
  //     this.rowData = ordersData;
  //   });
  // }

  ordersFilter() {
    this._getOrders();
  }

  private _getOrders() {
    this._ordersService.getOrders(this.ordersControls)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((ordersData) => {
        this.rowData = ordersData;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
