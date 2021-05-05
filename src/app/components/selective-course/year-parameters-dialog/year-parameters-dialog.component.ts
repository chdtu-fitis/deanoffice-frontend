import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertsService} from '../../shared/alerts/alerts.service';

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
      firstRoundStartDate: ['', Validators.required],
      firstRoundEndDate: ['', Validators.required],
      secondRoundStartDate: ['', Validators.required],
      secondRoundEndDate: ['', Validators.required],
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

      this.selectiveCourseService.createYearParameters(body).subscribe(() => {
        this.onSubmit.emit();
        this.bsModalRef.hide();
        this.alerts.showSuccess({body: 'Параметри навчального року були успішно встановлені', timeout: 3000});
      }, error => {
        if (error.status == 500) {
          this.message =
            'Параметри вибору вибіркових дисциплін на на наступний навчальний рік вже були введені';
        }
        console.log(body,error);
      });
    }
    else {
      this.message = 'Перевірте корректність введених даних';
    }
  }

  get f() { return this.form.controls; }
}
