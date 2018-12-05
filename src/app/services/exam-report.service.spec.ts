import { TestBed, inject } from '@angular/core/testing';

import { ExamReportService } from './exam-report.service';

describe('ExamReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ ExamReportService ] });
  });

  it('should be created', inject([ ExamReportService ], (service: ExamReportService) => {
    expect(service).toBeTruthy();
  }));
});
