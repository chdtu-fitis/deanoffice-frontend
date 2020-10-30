import { TestBed } from '@angular/core/testing';

import { FieldOfKnowledgeService } from './field-of-knowledge.service';

describe('FieldOfKnowledgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldOfKnowledgeService = TestBed.get(FieldOfKnowledgeService);
    expect(service).toBeTruthy();
  });
});
