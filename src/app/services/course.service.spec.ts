import { TestBed, inject } from '@angular/core/testing';

import { CourseService } from './course.service';

describe('CourseService', (): void => {
  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [ CourseService ] });
  });

  it('should be created', inject([ CourseService ], (service: CourseService): void => {
    expect(service).toBeTruthy();
  }));
});
