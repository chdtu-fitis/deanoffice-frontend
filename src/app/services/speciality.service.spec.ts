import { TestBed, inject } from '@angular/core/testing';

import { SpecialityService } from './speciality.service';

describe('SpecialityService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ SpecialityService ] });
  });

  it('should be created', inject([ SpecialityService ], (service: SpecialityService): void => {
    expect(service).toBeTruthy();
  }));
});
