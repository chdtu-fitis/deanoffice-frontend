import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertsService} from '../../shared/alerts/alerts.service';

@Component({
  selector: 'selective-parameters-dialog',
  templateUrl: './year-parameters-dialog.component.html',
  styleUrls: ['./year-parameters-dialog.component.scss']
})
export class YearParametersDialogComponent implements OnInit {
  private form = new FormGroup({
    firstRoundStartDate: new FormControl(null, [
      Validators.required,
    ]),
    firstRoundEndDate: new FormControl(null, [
      Validators.required,
    ]),
    secondRoundEndDate: new FormControl(null, [
      Validators.required,
    ]),
    minStudentsCount: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(100)
    ]),
});

  message = '';


  @Output() onSubmit = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService,
              private alerts: AlertsService) {
  }

  ngOnInit() {
  }


  submit() {
    if(this.form.valid) {
      const body = this.form.getRawValue();

      this.selectiveCourseService.createYearParameters(body).subscribe(() => {
        this.onSubmit.emit();
        this.bsModalRef.hide();
        this.alerts.showSuccess({body:'Параметри навчального року були успішно встановлені', timeout: 3000});
      }, error => {
        if (error.status == 500) {
          this.message =
            `Параметри вибору вибіркових дисциплін на на наступний навчальний рік вже були введені`;
        }
        console.log(body,error);
      });
    }
    else {
      this.message = 'Перевірте корректність введених даних';
    }
  }
}
