import {TestBed, inject} from '@angular/core/testing';

import {DiplomaSupplementService} from './diploma-supplement.service';

describe('DiplomaSupplementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiplomaSupplementService]
    });
  });

  it('should be created', inject([DiplomaSupplementService], (service: DiplomaSupplementService) => {
    expect(service).toBeTruthy();
  }));
});
