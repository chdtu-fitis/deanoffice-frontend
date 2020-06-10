import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {OrderReasonService} from '../../../../services/order-reason.service';
import {first} from 'rxjs/operators';
import { APPLICATION_REASON } from '../../constants';
import {OrdersService} from '../../../../services/orders.service';

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
    { value: '#FullName', editable: true }
   ];

  private baseStudentObj = {
    studentDegreeId: ['', Validators.required],
    orderReason: [this.applicationReason],
    orderReasonId: [''],
    studentFullName: [''],
    studentName: [''],
    studentSurname: [''],
    studentPatronymic: [''],
    studentWord: ['студента'],
    courseNumber: [4],
    qualification: ['бакалавр'],
    tuitionForm: ['денної'],
    groupName: [''],
    specialityCode: ['124'],
    specialityName: ['Системний аналіз'],
    studyProgram: ['Системи і методи прийняття рішень'],
    budgetForm: ['навчання за рахунок коштів фізичних (юридичних) осіб'],
    connectionWordMaleFemale: ['такого'],
    semesterNumber: ['першому'],
    studyYears: ['2019-2020'],
    orderCause: ['Підстава:  службова зав. кафедри.'],
    orderExpelDate: [null, Validators.required],
    orderApplicationDate: [null, Validators.required]
  };

  constructor(private fb: FormBuilder,
              private _orderReasonService: OrderReasonService,
              private _orderService: OrdersService) { }

  ngOnInit() {
    this._initForm();
    this.getOrderExpelReasons();
    this.getParagraphJSONByOrderType();
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
    this.expelStudents.push(this.fb.group(JSON.parse(JSON.stringify(this.baseStudentObj))));
  }

  private _initForm() {
    this.expelStudentOrder = this.fb.group({
      expelStudents: this.fb.array([
        this.fb.group(JSON.parse(JSON.stringify(this.baseStudentObj)))
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

  private getParagraphJSONByOrderType() {
    this._orderService.getOrderParagraphJsonByType()
      .pipe(first())
      .subscribe( res => {
        this.defaultTemplate = res;
        console.log(this.defaultTemplate);
      })
  }

  private _replacePlaceholders(index) {
    const formValues = this.expelStudents.controls[index].value;

    const substitutes = {
      '#PHStudentSurname': formValues['studentSurname'],
      '#PHStudentName': formValues['studentName'],
      '#PHStudentPatronymic': formValues['studentPatronymic'],
      '#PHStudentWord': formValues['studentWord'],
      '#CourseNumber': formValues['courseNumber'],
      '#PHQualification': formValues['qualification'],
      '#PHTuitionForm': formValues['tuitionForm'],
      '#PHGroupName': formValues['groupName'],
      '#PHSpecialityCode': formValues['specialityCode'],
      '#PHSpecialityName': formValues['specialityName'],
      '#PHStudyProgram': formValues['studyProgram'],
      '#PHBudgetForm': formValues['budgetForm'],
      '#PHConnectionWordMaleFemale': formValues['connectionWordMaleFemale'],
      '#PHStudentExpelReason': formValues['orderReason'],
      '#PHStudentExpelDate': new Date(formValues['orderExpelDate']).toLocaleDateString(),
      '#PHSemesterNumber': formValues['semesterNumber'],
      '#PHStudyYears': formValues['studyYears'],
      '#PHOrderCause': formValues['orderCause']
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
