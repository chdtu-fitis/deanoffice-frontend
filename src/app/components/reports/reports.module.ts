import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DebtorStatisticsComponent} from './debtors-statistics/debtor-statistics.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {PipeModule} from '../../pipes/pipe.module';
import {SharedModule} from '../shared/shared.module';
import {DebtorStatisticsService} from '../../services/debtor-statistics.service';
import {AuthenticationModule} from '../login/authentication.module';
import {AbbreviatedNamePipe} from '../../pipes/abbreviated-name.pipe';



export const reportRouts: Routes = [
  {path: 'debts', component: DebtorStatisticsComponent, data: { title: 'Звіт з успішності'}}
];
@NgModule({
  imports: [
    TabsModule.forRoot(),
    SharedModule,
    CommonModule,
    RouterModule.forChild(reportRouts),
    PipeModule
  ],
  declarations: [
    DebtorStatisticsComponent
  ],
  providers: [
    AuthenticationModule.tokenInterceptor(),
    DebtorStatisticsService
  ]
})
export class ReportsModule {}
