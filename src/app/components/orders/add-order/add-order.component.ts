import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { OrdersService } from '../../../services/orders.service';
import { StudentExpelOrderComponent } from './student-expel-order/student-expel-order.component';
import { Observable } from 'rxjs/Observable';
import { students } from '../moc';
import { Subject } from 'rxjs/Rx';
import { first } from 'rxjs/operators';

@Component({
  selector: 'add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal', {static: false}) modal: ModalDirective;
  @ViewChild('createOrderTemplateRef', {static: false, read: ViewContainerRef}) createOrderTemplateRef: ViewContainerRef;

  public createOrderForm: FormGroup;
  public orderTypes;
  public loading = false;

  studentsSurnames = students.map(elem => elem.surname);

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder,
              private _ordersService: OrdersService,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  async ngOnInit() {
    this._initForm();
    this.orderTypes = await this._ordersService.getOrderTypes().toPromise();
  }

  ngAfterViewInit() {
    this.modal.ngOnInit();
  }

  public hideModal(): void {
    this.modal.hide()
  }

  public onSubmit(): void {
    this._getOrderTemplateByType()
      .pipe(first())
      .subscribe(() => {
        this.hideModal();
        this._createOrder(this.createOrderForm.value.orderType);
      });
  }

  private _createOrder(orderType: string): void {
    if (orderType === 'deduction') {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(StudentExpelOrderComponent);
      this.createOrderTemplateRef.clear();
      const componentRef = this.createOrderTemplateRef.createComponent(componentFactory);
      const orderComponentInstance = componentRef.instance as StudentExpelOrderComponent;
      this._listenOrderClose(orderComponentInstance);
    }
  }

  public changeOrderType(orderType): void {
    console.log(orderType);
  }

  private _initForm(): void {
    this.createOrderForm = this.fb.group({
      orderType: new FormControl('deduction'),
      orderNumber: new FormControl('',  Validators.required),
      orderDate: new FormControl(null,  Validators.required),
    })
  }

  private _listenOrderClose(componentInstance) {
    componentInstance.orderClose$.pipe(first()).subscribe(() => {
      this.createOrderTemplateRef.clear();
    })
  }

  private _getOrderTemplateByType(): Observable<any> {
    return this._ordersService.getOrderTemplateByType();
  }

  // private _trackStudentNameChange() {
  //   this.createOrderForm.get('studentName').valueChanges
  //     .pipe(
  //       debounceTime(500),
  //       switchMap(name => this.getStudentsAsObservable(name)),
  //       takeUntil(this.ngUnsubscribe))
  //     .subscribe(name => {
  //        this.studentsSurnames = name;
  //        console.log(this.studentsSurnames);
  //     })
  // }

  ngOnDestroy() {
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe.next();
  }
}
