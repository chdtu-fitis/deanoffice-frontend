import { TestBed, inject } from '@angular/core/testing';

import { EdeboService } from './edebo.service';

describe('EdeboService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ EdeboService ] });
  });

  it('should be created', inject([ EdeboService ], (service: EdeboService): void => {
    expect(service).toBeTruthy();
  }));
});
