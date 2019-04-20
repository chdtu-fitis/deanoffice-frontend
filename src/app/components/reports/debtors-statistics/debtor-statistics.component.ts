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
  loadingDocument: boolean;
  sessionSeason: string;
  sessionYears: string;
  currentDate: Date;

  constructor(private report: DebtorStatisticsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.currentDate = new Date();
    this.sessionSeason = this.getSessionSeason();
    this.sessionYears = this.getSessionYears();
    this.report.getDebts().subscribe(result => {
      this.specializationDebtors = result;
      this.loading = !this.loading;
    });
  }

  getUniqueFacultyName(value: string) {
    return value !== 'ФІТС' ? value : 'ФІТІС';
  }

  private getSessionYears() {
    const currentYear = this.currentDate.getFullYear();
    return (currentYear - 1) + ' - ' + currentYear;
  }

  private getSessionSeason() {
    const summerSessionStart = new Date(`06/10/${this.currentDate.getFullYear()}`);
    const winterSessionStart = new Date(`12/17/${this.currentDate.getFullYear()}`);
    const winterSeason = this.currentDate > winterSessionStart || this.currentDate < summerSessionStart;
    return winterSeason ? 'зимньої' : 'літньої';
  }

  onMakeDocument() {
    this.loadingDocument = true;
    this.report.buildDebtorsStatisticsReport().subscribe(() => {
      this.loadingDocument = false;
    }
  );
  }
}
