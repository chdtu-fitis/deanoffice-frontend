import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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

  studyYear: number;

  isError = true;
  message = '';


  @Output() onSubmit = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
              private selectiveCourseService: SelectiveCourseService) {
  }

  ngOnInit() {
  }


  submit() {
    if(this.form.valid) {
      const body = this.form.getRawValue();

      this.selectiveCourseService.postYearParameters(body).subscribe(() => {
        this.onSubmit.emit();
        this.showMessage(false, 'Параметри вибору були успішно збережені')
      }, error => {
        if (error.status == 500) {
          this.showMessage(true,
            `Параметри вибору вибіркових дисциплін на ${this.studyYear} навчальний рік вже були введені`);
        }
        console.log(body,error);
      });
    }
    else {
      this.showMessage(true, 'Перевірте корректність введених даних');
    }
  }

  showMessage(isError: boolean, message: string) {
    this.isError = isError;
    this.message = message;
  }
}
