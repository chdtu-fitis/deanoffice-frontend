import { TestBed, inject } from '@angular/core/testing';

import { SpecializationService } from './specialization.service';

describe('SpecializationService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ SpecializationService ] });
  });

  it('should be created', inject([ SpecializationService ], (service: SpecializationService): void => {
    expect(service).toBeTruthy();
  }));
});
