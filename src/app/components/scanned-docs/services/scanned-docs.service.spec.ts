import { TestBed, inject } from '@angular/core/testing';

import { ScannedDocsService } from './scanned-docs.service';

describe('ScannedDocsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScannedDocsService]
    });
  });

  it('should be created', inject([ScannedDocsService], (service: ScannedDocsService) => {
    expect(service).toBeTruthy();
  }));
});
