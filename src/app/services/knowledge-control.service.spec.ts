import { TestBed, inject } from '@angular/core/testing';

import { KnowledgeControlService } from './knowledge-control.service';

describe('KnowledgeControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ KnowledgeControlService ] });
  });

  it('should be created', inject([ KnowledgeControlService ], (service: KnowledgeControlService) => {
    expect(service).toBeTruthy();
  }));
});
