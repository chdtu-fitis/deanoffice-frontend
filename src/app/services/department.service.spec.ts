import { TestBed, inject } from '@angular/core/testing';

import { DepartmentService } from './department.service';

describe('DepartmentService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ DepartmentService ] });
  });

  it('should be created', inject([ DepartmentService ], (service: DepartmentService): void => {
    expect(service).toBeTruthy();
  }));
});
