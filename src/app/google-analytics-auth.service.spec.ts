import { TestBed, inject } from '@angular/core/testing';

import { GoogleAnalyticsAuthService } from './google-analytics-auth.service';

describe('GoogleAnalyticsAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAnalyticsAuthService]
    });
  });

  it('should be created', inject([GoogleAnalyticsAuthService], (service: GoogleAnalyticsAuthService) => {
    expect(service).toBeTruthy();
  }));
});
