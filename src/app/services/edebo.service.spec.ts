import { TestBed, inject } from '@angular/core/testing';

import { EdeboService } from './edebo.service';

describe('EdeboService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EdeboService]
    });
  });

  it('should be created', inject([EdeboService], (service: EdeboService) => {
    expect(service).toBeTruthy();
  }));
});
