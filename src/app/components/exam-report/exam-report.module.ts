import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExamReportComponent} from './exam-report.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {appRoutes, examReportRoutes} from '../../routes/routes';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(examReportRoutes)
  ],
  declarations: [ExamReportComponent]
})
export class ExamReportModule { }
