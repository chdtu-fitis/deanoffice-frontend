import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DebtorStatisticsComponent} from './debtors-statistics/debtor-statistics.component';
import {TabsModule} from 'ngx-bootstrap';
import {PipeModule} from '../../pipes/pipe.module';


export const reportRouts: Routes = [
  {path: 'debts', component: DebtorStatisticsComponent, data: { title: 'Звіт з успішності'}}
];
@NgModule({
  imports: [
    TabsModule.forRoot(),
    CommonModule,
    RouterModule.forChild(reportRouts),
    PipeModule
  ],
  declarations: [
    DebtorStatisticsComponent
  ]
})
export class ReportsModule {}
