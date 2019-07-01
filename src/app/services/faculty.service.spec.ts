import { TestBed, inject } from '@angular/core/testing';

import { FacultyService } from './faculty.service';

describe('FacultyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultyService]
    });
  });

  it('should be created', inject([FacultyService], (service: FacultyService) => {
    expect(service).toBeTruthy();
  }));
});
