import { TestBed, inject } from '@angular/core/testing';

import { EdoboDiplomaNumberService } from './edobo-diploma-number.service';

describe('EdoboDiplomaNumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdoboDiplomaNumberService]
    });
  });

  it('should be created', inject([EdoboDiplomaNumberService], (service: EdoboDiplomaNumberService) => {
    expect(service).toBeTruthy();
  }));
});
