import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {ModalDirective} from 'ngx-bootstrap';

import {OrdersService} from '../../../services/orders.service';
import {DeductionOrderComponent} from './deduction-order/deduction-order.component';
import {Observable} from 'rxjs/Observable';
import {students} from '../moc';
import {of} from 'rxjs/internal/observable/of';
import {debounceTime, switchMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/Rx';

@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DeductionOrderComponent, {static: false}) deduction: DeductionOrderComponent;
  @ViewChild('modal', {static: false}) modal: ModalDirective;

  public createOrderForm: FormGroup;
  public orderTypes;
  public typeaheadLoading = null;
  public studentSource: Observable<any>;

  studentsSurnames = students.map(elem => elem.surname);

  private ngUnsubscribe: Subject<any> = new Subject();


  constructor(private fb: FormBuilder,
              private _ordersService: OrdersService) {}

  async ngOnInit() {
    this._initForm();
    this.orderTypes = await this._ordersService.getOrderTypes().toPromise();
    this._trackStudentNameChange();
  }

  ngAfterViewInit() {
    this.modal.ngOnInit();
    this.deduction.deductionOrder.setParent(this.createOrderForm);
    this.createOrderForm.addControl('deductionOrder', this.deduction.deductionOrder);
  }

  public hideModal(): void {
    this.modal.hide()
  }

  public onSubmit(): void {

  }

  public changeOrderType(orderType): void {
    console.log(orderType);
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  private getStudentsAsObservable(token: string): Observable<any> {
    const query = new RegExp(token, 'i');

    return of(
      students.map(elem => elem.surname).filter((state: any) => {
        return query.test(state);
      })
    );
  }

  private _initForm(): void {
    this.createOrderForm = this.fb.group({
      orderType: new FormControl('deduction'),
      orderNumber: new FormControl('',  Validators.required),
      orderDate: new FormControl(null,  Validators.required),
      studentName: new FormControl('')
    })
  }

  private _trackStudentNameChange() {
    this.createOrderForm.get('studentName').valueChanges
      .pipe(
        debounceTime(500),
        switchMap(name => this.getStudentsAsObservable(name)),
        takeUntil(this.ngUnsubscribe))
      .subscribe(name => {
         this.studentsSurnames = name;
         console.log(this.studentsSurnames);
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.next();
  }
}
