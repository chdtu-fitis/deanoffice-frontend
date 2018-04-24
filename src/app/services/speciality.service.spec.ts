import { TestBed, inject } from '@angular/core/testing';

import { SpecialityService } from './speciality.service';

describe('SpecialityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpecialityService]
    });
  });

  it('should be created', inject([SpecialityService], (service: SpecialityService) => {
    expect(service).toBeTruthy();
  }));
});
