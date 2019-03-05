import {Component, OnInit} from '@angular/core';
import {DebtorStatisticsService} from '../../../services/debtor-statistics.service';
import {SpecializationWithDebtorsStatistics} from '../../../models/reports/debtors-statistics/SpecializationWithDebtorsStatistics';


@Component({
  selector: 'app-reports-debts',
  templateUrl: './debtor-statistics.component.html',
  styleUrls: ['./debtor-statistics.component.scss'],
})

export class DebtorStatisticsComponent implements OnInit {
  specializationDebtors: SpecializationWithDebtorsStatistics[];
  loading: boolean;

  constructor(private report: DebtorStatisticsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.report.getDebts().subscribe(result => {
      this.specializationDebtors = result;
      this.loading = !this.loading;
      console.log(this.specializationDebtors);
    });
  }

  getUniqueFacultyName(value: string) {
    return value !== 'ФІТС' ? value : 'ФІТІС';
  }
}
