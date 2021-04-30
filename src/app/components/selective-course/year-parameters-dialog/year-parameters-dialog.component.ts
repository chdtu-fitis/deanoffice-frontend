import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertsService} from '../../shared/alerts/alerts.service';

@Component({
  selector: 'selective-parameters-dialog',
  templateUrl: './year-parameters-dialog.component.html',
  styleUrls: ['./year-parameters-dialog.component.scss']
})
export class YearParametersDialogComponent implements OnInit {
  private form = new FormGroup({
    firstRoundStartDate: new FormControl(),
    firstRoundEndDate: new FormControl(),
    secondRoundStartDate: new FormControl(),
    secondRoundEndDate: new FormControl(),
    bachelorGeneralMinStudentsCount: new FormControl(),
    bachelorProfessionalMinStudentsCount: new FormControl(),
    masterGeneralMinStudentsCount: new FormControl(),
    masterProfessionalMinStudentsCount: new FormControl(),
    phdGeneralMinStudentsCount: new FormControl(),
    phdProfessionalMinStudentsCount: new FormControl(),
    maxStudentsCount: new FormControl(),
}, {
    validators: [
  Validators.required,
  Validators.min(1),
]});

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
            'Параметри вибору вибіркових дисциплін на на наступний навчальний рік вже були введені';
        }
        console.log(body,error);
      });
    }
    else {
      this.message = 'Перевірте корректність введених даних';
    }
  }
}
