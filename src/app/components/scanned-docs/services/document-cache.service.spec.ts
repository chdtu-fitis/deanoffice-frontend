import { TestBed, inject } from '@angular/core/testing';

import { DocumentCacheService } from './document-cache.service';

describe('CacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocumentCacheService]
    });
  });

  it('should be created', inject([DocumentCacheService], (service: DocumentCacheService) => {
    expect(service).toBeTruthy();
  }));
});
