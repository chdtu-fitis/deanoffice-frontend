import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';

import {ExamReportComponent} from './exam-report.component';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../../pipes/pipe.module';

export const examReportRoutes: Routes = [
  {path: '', component: ExamReportComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatRadioModule,
    PipeModule.forRoot(),
    RouterModule.forChild(examReportRoutes)
  ],
  declarations: [ExamReportComponent]
})
export class ExamReportModule { }
