import { TestBed, inject } from '@angular/core/testing';

import { GradeService } from './grade.service';

describe('GradeService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ GradeService ] });
  });

  it('should be created', inject([ GradeService ], (service: GradeService): void => {
    expect(service).toBeTruthy();
  }));
});
