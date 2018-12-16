import { TestBed, inject } from '@angular/core/testing';

import { ExamReportService } from './exam-report.service';

describe('ExamReportService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ ExamReportService ] });
  });

  it('should be created', inject([ ExamReportService ], (service: ExamReportService): void => {
    expect(service).toBeTruthy();
  }));
});
