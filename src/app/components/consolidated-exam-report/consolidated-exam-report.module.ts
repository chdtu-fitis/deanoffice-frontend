import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsolidatedExamReportComponent } from './consolidated-exam-report.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PipeModule } from '../../pipes/pipe.module';

export const consolidatedExamReportRoutes: Routes = [
  { path: '', component: ConsolidatedExamReportComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipeModule.forRoot(),
    RouterModule.forChild(consolidatedExamReportRoutes),
  ],
  declarations: [ConsolidatedExamReportComponent]
})
export class ConsolidatedExamReportModule { }
