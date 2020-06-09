import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {OrderReasonService} from '../../../../services/order-reason.service';
import {first} from 'rxjs/operators';
import { APPLICATION_REASON } from '../../constants';

@Component({
  selector: 'app-deduction-order',
  templateUrl: './student-expel-order.component.html',
  styleUrls: ['./student-expel-order.component.scss']
})
export class StudentExpelOrderComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: false}) modal: ModalDirective;

  @Output() orderClose$: EventEmitter<void> = new EventEmitter<void>();

  public orderReasons: {id: number, name: string}[];
  public expelStudentOrder: FormGroup;
  public expelStudents: FormArray;
  public expelStudentsPreview: FormArray;

  public isStudentTemplateAvailable = true;

  private applicationReason = APPLICATION_REASON;
  private defaultTemplate = [
    { value: 'Hello my name is', editable: false },
    { value: '#FullName', editable: true }];

  constructor(private fb: FormBuilder,
              private _orderReasonService: OrderReasonService) { }

  ngOnInit() {
    this._initForm();
    this.getOrderExpelReasons();
  }

  ngAfterViewInit() {
    this.modal.show();
  }

  public hideModal(): void {
    this.orderClose$.emit();
    this.modal.hide()
  }

  public expelNewStudent() {
    this.isStudentTemplateAvailable = true;
    this.expelStudents.push(
      this.fb.group({
      studentDegreeId: ['', Validators.required],
      orderReason: [this.applicationReason],
      orderReasonId: [''],
      studentFullName: [''],
      orderExpelDate: [null, Validators.required],
      orderApplicationDate: [null, Validators.required]
    }));
  }

  private _initForm() {
    this.expelStudentOrder = this.fb.group({
      expelStudents: this.fb.array([
        this.fb.group({
          studentDegreeId: ['', Validators.required],
          studentFullName: [''],
          studentGender: [''],
          orderReason: [this.applicationReason],
          orderReasonId: [''],
          orderExpelDate: [null, Validators.required],
          orderApplicationDate: [null, Validators.required]
        })
      ]),
      expelStudentsPreview: this.fb.array( [])
    });
    this.expelStudents = this.expelStudentOrder.get('expelStudents') as FormArray;
    this.expelStudentsPreview = this.expelStudentOrder.get('expelStudentsPreview') as FormArray;
  }

  public onStudentAdd(index: number): void {
    this.isStudentTemplateAvailable = true;
    if (this.expelStudentsPreview.controls[index]) {
      this.expelStudentsPreview.removeAt(index);
      this.expelStudentsPreview.insert(index, this.fb.array(this._replacePlaceholders(index)));
    } else {
      this.expelStudentsPreview.push(this.fb.array(this._replacePlaceholders(index)))
    }
    console.log(this.expelStudentsPreview.controls);
  }

  public onStudentDelete(index: number): void {
    this.expelStudents.removeAt(index);
    this.expelStudentsPreview.removeAt(index);
  }

  public onStudentEdit(): void {
    this.isStudentTemplateAvailable = true;
  }

  private getOrderExpelReasons() {
    this._orderReasonService.getExpelOrderReasons()
      .pipe(first())
      .subscribe(
        res => {
          this.orderReasons = res;
        });
  }

  private _replacePlaceholders(index) {
    const formValues = this.expelStudents.controls[index].value;


    const substitutes = {
      '#FullName': formValues['studentFullName']
    };

    return this.defaultTemplate.map(elem => {
      if (substitutes[elem.value]) {
        return { ...elem, value: substitutes[elem.value] }
      }

      return elem;
    });
  }

  public onPreviewSave() {
    this.isStudentTemplateAvailable = false;
  }
}
