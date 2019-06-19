import { TestBed, inject } from '@angular/core/testing';

import { AnalyticsApiService } from './analytics-api.service';

describe('AnalyticsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalyticsApiService]
    });
  });

  it('should be created', inject([AnalyticsApiService], (service: AnalyticsApiService) => {
    expect(service).toBeTruthy();
  }));
});
