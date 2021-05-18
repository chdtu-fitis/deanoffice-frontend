import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SelectiveCourseService } from '../../../services/selective-course.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AlertsService } from '../../shared/alerts/alerts.service';
import {SelectiveCoursesYearParameters} from '../../../models/SelectiveCoursesYearParameters';

@Component({
  selector: 'selective-parameters-dialog',
  templateUrl: './year-parameters-dialog.component.html',
  styleUrls: ['./year-parameters-dialog.component.scss']
})
export class YearParametersDialogComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  message = '';


  @Output() onSubmit = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
              public fb: FormBuilder,
              private selectiveCourseService: SelectiveCourseService,
              private alerts: AlertsService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstRoundStartDateEarlyPeriod: ['', Validators.required],
      firstRoundEndDateEarlyPeriod: ['', Validators.required],
      secondRoundStartDateEarlyPeriod: ['', Validators.required],
      secondRoundEndDateEarlyPeriod: ['', Validators.required],

      firstRoundStartDateLatePeriod: ['', Validators.required],
      firstRoundEndDateLatePeriod: ['', Validators.required],
      secondRoundStartDateLatePeriod: ['', Validators.required],
      secondRoundEndDateLatePeriod: ['', Validators.required],

      bachelorGeneralMinStudentsCount: ['', [Validators.required, Validators.min(1)]],
      bachelorProfessionalMinStudentsCount: ['', [Validators.required, Validators.min(1)]],
      masterGeneralMinStudentsCount: ['', [Validators.required, Validators.min(1)]],
      masterProfessionalMinStudentsCount: ['', [Validators.required, Validators.min(1)]],
      phdGeneralMinStudentsCount: ['', [Validators.required, Validators.min(1)]],
      phdProfessionalMinStudentsCount: ['', [Validators.required, Validators.min(1)]],
      maxStudentsCount: ['', [Validators.required, Validators.min(1)]],
    });
  }

  submit() {
    this.submitted = true;
    if (this.form.valid) {
      const body = this.form.getRawValue();

      let a : SelectiveCoursesYearParameters;
      let b : SelectiveCoursesYearParameters;

      a.firstRoundStartDate = this.form.get('firstRoundStartDateEarlyPeriod').value;
      a.firstRoundEndDate = this.form.get('firstRoundEndDateEarlyPeriod').value;
      a.secondRoundStartDate = this.form.get('secondRoundStartDateEarlyPeriod').value;
      a.secondRoundEndDate = this.form.get('secondRoundEndDateEarlyPeriod').value;

      b.firstRoundStartDate = this.form.get('firstRoundStartDateLatePeriod').value;
      b.firstRoundEndDate = this.form.get('firstRoundEndDateLatePeriod').value;
      b.secondRoundStartDate = this.form.get('secondRoundStartDateLatePeriod').value;
      b.secondRoundEndDate = this.form.get('secondRoundEndDateLatePeriod').value;

      a.bachelorGeneralMinStudentsCount = b.bachelorGeneralMinStudentsCount = this.form.get('bachelorGeneralMinStudentsCount').value;
      a.bachelorProfessionalMinStudentsCount = b.bachelorProfessionalMinStudentsCount = this.form.get('bachelorProfessionalMinStudentsCount').value;
      a.masterGeneralMinStudentsCount = b.masterGeneralMinStudentsCount = this.form.get('masterGeneralMinStudentsCount').value;
      a.masterProfessionalMinStudentsCount = b.masterProfessionalMinStudentsCount = this.form.get('masterProfessionalMinStudentsCount').value;
      a.phdGeneralMinStudentsCount = b.phdGeneralMinStudentsCount = this.form.get('phdGeneralMinStudentsCount').value;
      a.phdProfessionalMinStudentsCount = b.phdProfessionalMinStudentsCount = this.form.get('phdProfessionalMinStudentsCount').value;
      a.maxStudentsCount = b.maxStudentsCount = this.form.get('maxStudentsCount').value;

      this.selectiveCourseService.createYearParameters(a, b).subscribe(() => {
        this.onSubmit.emit();
        this.bsModalRef.hide();
        this.alerts.showSuccess({ body: 'Параметри навчального року були успішно встановлені', timeout: 3000 });
      }, error => {
        if (error.status == 500) {
          this.message =
            'Параметри вибору вибіркових дисциплін на на наступний навчальний рік вже були введені';
        }
        console.log(body, error);
      });
    }
    else {
      this.message = 'Перевірте корректність введених даних';
    }
  }

  get f() { return this.form.controls; }
}
