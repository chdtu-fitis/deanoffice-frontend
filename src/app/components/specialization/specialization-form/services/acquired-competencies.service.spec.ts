import { TestBed, inject } from '@angular/core/testing';

import { AcquiredCompetenciesService } from './acquired-competencies.service';

describe('AcquiredCompetenciesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ AcquiredCompetenciesService ] });
  });

  it('should be created', inject([ AcquiredCompetenciesService ], (service: AcquiredCompetenciesService) => {
    expect(service).toBeTruthy();
  }));
});
