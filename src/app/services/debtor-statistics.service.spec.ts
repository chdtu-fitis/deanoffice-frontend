import { TestBed, inject } from '@angular/core/testing';

import { DebtorStatisticsService } from './debtor-statistics.service';

describe('DebtorStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebtorStatisticsService]
    });
  });

  it('should be created', inject([DebtorStatisticsService], (service: DebtorStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
