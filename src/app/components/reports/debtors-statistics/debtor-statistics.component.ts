import {Component, OnInit} from '@angular/core';
import {DebtorStatisticsService} from '../../../services/debtor-statistics.service';
import {SpecializationWithDebtorsStatistics} from '../../../models/reports/debtors-statistics/SpecializationWithDebtorsStatistics';
import {Utils} from '../../shared/utils';


@Component({
  selector: 'app-reports-debts',
  templateUrl: './debtor-statistics.component.html',
  styleUrls: ['./debtor-statistics.component.scss'],
})

export class DebtorStatisticsComponent implements OnInit {
  specializationDebtors: SpecializationWithDebtorsStatistics[];
  loading: boolean;
  loadingDocument: boolean;
  sessionSeason: string;
  currentDate: Date;

  constructor(private report: DebtorStatisticsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.currentDate = new Date();
    this.sessionSeason = Utils.isWinterSeason() ? 'зимньої' : 'літньої';
    this.report.getDebts().subscribe(result => {
      this.specializationDebtors = result;
      this.loading = !this.loading;
    });
  }

  getUniqueFacultyName(value: string) {
    return value !== 'ФІТС' ? value : 'ФІТІС';
  }

  get sessionYears() {
    const currentYear = this.currentDate.getFullYear();
    return `${(currentYear - 1)} - ${currentYear}`;
  }

  onMakeDocument() {
    this.loadingDocument = true;
    this.report.buildDebtorsStatisticsReport().subscribe(() => {
      this.loadingDocument = false;
    }
  );
  }
}
