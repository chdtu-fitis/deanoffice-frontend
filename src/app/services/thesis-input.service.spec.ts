import { TestBed, inject } from '@angular/core/testing';

import { ThesisInputService } from './thesis-input.service';

describe('ThesisInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThesisInputService]
    });
  });

  it('should be created', inject([ThesisInputService], (service: ThesisInputService) => {
    expect(service).toBeTruthy();
  }));
});
