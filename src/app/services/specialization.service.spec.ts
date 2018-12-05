import { TestBed, inject } from '@angular/core/testing';

import { SpecializationService } from './specialization.service';

describe('SpecializationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ SpecializationService ] });
  });

  it('should be created', inject([ SpecializationService ], (service: SpecializationService) => {
    expect(service).toBeTruthy();
  }));
});
