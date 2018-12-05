import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamReportComponent } from './exam-report.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../../pipes/pipe.module';

export const examReportRoutes: Routes = [
  {
    path: '',
    component: ExamReportComponent 
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(examReportRoutes)
  ],
  declarations: [ ExamReportComponent ]
})
export class ExamReportModule { }
