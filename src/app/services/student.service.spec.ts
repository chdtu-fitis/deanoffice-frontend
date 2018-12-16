import { TestBed, inject } from '@angular/core/testing';

import { StudentService } from './student.service';

describe('StudentService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ StudentService ] });
  });

  it('should be created', inject([ StudentService ], (service: StudentService): void => {
    expect(service).toBeTruthy();
  }));
});
