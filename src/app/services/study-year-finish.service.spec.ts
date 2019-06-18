import { TestBed, inject } from '@angular/core/testing';

import { StudyYearFinishService } from './study-year-finish.service';

describe('StudyYearFinishService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyYearFinishService]
    });
  });

  it('should be created', inject([StudyYearFinishService], (service: StudyYearFinishService) => {
    expect(service).toBeTruthy();
  }));
});
