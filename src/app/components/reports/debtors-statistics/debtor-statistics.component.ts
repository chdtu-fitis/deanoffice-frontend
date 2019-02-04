import {Component, OnInit} from '@angular/core';
import {DebtorStatisticsService} from '../../../services/debtor-statistics.service';
import {SpecializationWithDebtorsStatistics} from '../../../models/reports/debtors-statistics/SpecializationWithDebtorsStatistics';

@Component({
  selector: 'app-reports-debts',
  templateUrl: './debtor-statistics.component.html',
  styleUrls: ['./debtor-statistics.component.scss'],
  providers : [
    DebtorStatisticsService
  ]
})

export class DebtorStatisticsComponent implements OnInit {
  private res: SpecializationWithDebtorsStatistics[];
  constructor(private report: DebtorStatisticsService) { }

  ngOnInit() {
    this.report.getDebts().subscribe(res => {
     this.res = res;
     this.getd();
    });
  }

  getd() {
    console.log(this.res)
  }

}
