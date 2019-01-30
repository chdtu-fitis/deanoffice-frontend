import {Component, OnInit} from '@angular/core';
import {DebtorStatisticsService} from '../../../services/debtor-statistics.service';
import {DebtorBySpescialityModel} from '../../../models/reports/debtors-statistics/debtor-by-spesciality.model';



@Component({
  selector: 'app-reports-debts',
  templateUrl: './debtor-statistics.component.html',
  styleUrls: ['./debtor-statistics.component.scss']
})
export class DebtorStatisticsComponent implements OnInit {
  private res: DebtorBySpescialityModel[];
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
