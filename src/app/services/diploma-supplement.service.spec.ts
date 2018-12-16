import { TestBed, inject } from '@angular/core/testing';

import { DiplomaSupplementService } from './diploma-supplement.service';

describe('DiplomaSupplementService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ DiplomaSupplementService ] });
  });

  it('should be created', inject([ DiplomaSupplementService ], (service: DiplomaSupplementService): void => {
    expect(service).toBeTruthy();
  }));
});
