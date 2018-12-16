import { TestBed, inject } from '@angular/core/testing';

import { ThesisInputService } from './thesis-input.service';

describe('ThesisInputService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ ThesisInputService ] });
  });

  it('should be created', inject([ ThesisInputService ], (service: ThesisInputService): void => {
    expect(service).toBeTruthy();
  }));
});
